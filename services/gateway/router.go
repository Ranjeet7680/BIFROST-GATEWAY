package main

import (
	"context"
	"errors"
	"sync"
	"time"
)

type CircuitState string

const (
	StateClosed   CircuitState = "CLOSED"
	StateHalfOpen CircuitState = "HALF_OPEN"
	StateOpen     CircuitState = "OPEN"
)

type CircuitBreaker struct {
	mu           sync.RWMutex
	failureCount int
	maxFailures  int
	state        CircuitState
	lastFailedAt time.Time
	cooldown     time.Duration
}

func NewCircuitBreaker(maxFailures int, cooldown time.Duration) *CircuitBreaker {
	return &CircuitBreaker{
		maxFailures: maxFailures,
		state:       StateClosed,
		cooldown:    cooldown,
	}
}

func (cb *CircuitBreaker) CanExecute() bool {
	cb.mu.Lock()
	defer cb.mu.Unlock()

	if cb.state == StateOpen {
		if time.Since(cb.lastFailedAt) > cb.cooldown {
			cb.state = StateHalfOpen
			return true
		}
		return false
	}
	return true
}

func (cb *CircuitBreaker) RecordSuccess() {
	cb.mu.Lock()
	defer cb.mu.Unlock()
	cb.failureCount = 0
	cb.state = StateClosed
}

func (cb *CircuitBreaker) RecordFailure() {
	cb.mu.Lock()
	defer cb.mu.Unlock()
	cb.failureCount++
	cb.lastFailedAt = time.Now()
	if cb.failureCount >= cb.maxFailures {
		cb.state = StateOpen
	}
}

type RouterEngine struct {
	circuits map[string]*CircuitBreaker
	mu       sync.RWMutex
}

func NewRouterEngine() *RouterEngine {
	return &RouterEngine{
		circuits: make(map[string]*CircuitBreaker),
	}
}

func (r *RouterEngine) SelectRoute(ctx context.Context, targetModel string, fallbackChain []string) (string, error) {
	r.mu.RLock()
	cb, exists := r.circuits[targetModel]
	r.mu.RUnlock()

	if !exists {
		cb = NewCircuitBreaker(3, 30*time.Second)
		r.mu.Lock()
		r.circuits[targetModel] = cb
		r.mu.Unlock()
	}

	if cb.CanExecute() {
		return targetModel, nil
	}

	// Primary tripped: Iterate fallback chain
	for _, fallback := range fallbackChain {
		r.mu.RLock()
		fbCircuit := r.circuits[fallback]
		r.mu.RUnlock()

		if fbCircuit == nil || fbCircuit.CanExecute() {
			return fallback, nil
		}
	}

	return "", errors.New("all upstream providers in fallback chain tripped")
}
