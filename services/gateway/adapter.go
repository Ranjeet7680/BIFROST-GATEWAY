package main

import (
	"context"
	"io"
)

type UnifiedMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type UnifiedChatRequest struct {
	Model       string           `json:"model"`
	Messages    []UnifiedMessage `json:"messages"`
	Temperature float32          `json:"temperature"`
	Stream      bool             `json:"stream"`
}

type UnifiedChatResponse struct {
	ID      string `json:"id"`
	Model   string `json:"model"`
	Content string `json:"content"`
	Tokens  int    `json:"tokens"`
}

// ProviderAdapter interface implemented by OpenAI, Anthropic, Gemini, Groq, Ollama
type ProviderAdapter interface {
	Name() string
	SendChat(ctx context.Context, req *UnifiedChatRequest) (*UnifiedChatResponse, error)
	StreamChat(ctx context.Context, req *UnifiedChatRequest, w io.Writer) error
	HealthCheck(ctx context.Context) (int, error)
}
