package main

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"sync"
	"time"
)

type CacheEntry struct {
	Response  string
	CreatedAt time.Time
	Tokens    int
}

type MemorySemanticCache struct {
	mu      sync.RWMutex
	storage map[string]CacheEntry
	ttl     time.Duration
}

func NewMemorySemanticCache(ttl time.Duration) *MemorySemanticCache {
	return &MemorySemanticCache{
		storage: make(map[string]CacheEntry),
		ttl:     ttl,
	}
}

func (c *MemorySemanticCache) Get(ctx context.Context, prompt string) (string, bool) {
	key := c.hashPrompt(prompt)

	c.mu.RLock()
	defer c.mu.RUnlock()

	entry, ok := c.storage[key]
	if !ok {
		return "", false
	}

	if time.Since(entry.CreatedAt) > c.ttl {
		return "", false
	}

	return entry.Response, true
}

func (c *MemorySemanticCache) Set(ctx context.Context, prompt, response string, tokens int) {
	key := c.hashPrompt(prompt)

	c.mu.Lock()
	defer c.mu.Unlock()

	c.storage[key] = CacheEntry{
		Response:  response,
		CreatedAt: time.Now(),
		Tokens:    tokens,
	}
}

func (c *MemorySemanticCache) hashPrompt(prompt string) string {
	h := sha256.Sum256([]byte(prompt))
	return hex.EncodeToString(h[:])
}
