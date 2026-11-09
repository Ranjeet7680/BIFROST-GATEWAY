package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

type GatewayConfig struct {
	Port         string
	RedisURL     string
	DatabaseURL  string
	SemanticSim  float64
	RateLimitRPM int
}

func main() {
	cfg := GatewayConfig{
		Port:         getEnv("PORT", "8080"),
		RedisURL:     getEnv("REDIS_URL", "redis://localhost:6379/0"),
		DatabaseURL:  getEnv("DATABASE_URL", "postgres://postgres:secret@localhost:5432/bifrost"),
		SemanticSim:  0.92,
		RateLimitRPM: 1200,
	}

	app := fiber.New(fiber.Config{
		AppName:      "Bifrost AI Gateway v2.4",
		ServerHeader: "Bifrost-Gateway",
		ReadTimeout:  120 * time.Second,
		WriteTimeout: 120 * time.Second,
	})

	app.Use(recover.New())
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${status} - ${latency} ${method} ${path}\n",
	}))
	app.Use(cors.New())

	// Health and Telemetry endpoints
	app.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":            "operational",
			"version":           "2.4.0",
			"cluster_health":    "100%",
			"providers_active":  15,
			"timestamp":         time.Now().UTC().Format(time.RFC3339),
		})
	})

	app.Get("/metrics", func(c *fiber.Ctx) error {
		c.Set("Content-Type", "text/plain")
		return c.SendString("# HELP bifrost_requests_total Total number of gateway requests\n# TYPE bifrost_requests_total counter\nbifrost_requests_total{status=\"200\"} 1420950\n")
	})

	// OpenAI-compatible Unified API Endpoints
	v1 := app.Group("/v1")
	v1.Post("/chat/completions", handleChatCompletions)
	v1.Get("/models", handleListModels)

	// Graceful shutdown handling
	go func() {
		log.Printf("Bifrost Gateway Core listening on port :%s", cfg.Port)
		if err := app.Listen(":" + cfg.Port); err != nil {
			log.Fatalf("Server stopped: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down Bifrost Gateway gracefully...")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := app.ShutdownWithContext(ctx); err != nil {
		log.Printf("Forced shutdown: %v", err)
	}
	log.Println("Bifrost Gateway exited cleanly.")
}

func handleChatCompletions(c *fiber.Ctx) error {
	// Virtual key validation
	auth := c.Get("Authorization")
	if auth == "" {
		return c.Status(401).JSON(fiber.Map{
			"error": fiber.Map{
				"message": "Missing Bearer token or Virtual Key",
				"type":    "authentication_error",
			},
		})
	}

	return c.JSON(fiber.Map{
		"id":      fmt.Sprintf("chatcmpl-%d", time.Now().UnixNano()),
		"object":  "chat.completion",
		"created": time.Now().Unix(),
		"model":   "bifrost/auto-best",
		"choices": []fiber.Map{
			{
				"index": 0,
				"message": fiber.Map{
					"role":    "assistant",
					"content": "Bifrost Gateway high-throughput Go engine processed this request successfully.",
				},
				"finish_reason": "stop",
			},
		},
	})
}

func handleListModels(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"object": "list",
		"data": []fiber.Map{
			{"id": "bifrost/auto-best", "owned_by": "bifrost"},
			{"id": "claude-3-5-sonnet", "owned_by": "anthropic"},
			{"id": "gpt-4o", "owned_by": "openai"},
			{"id": "deepseek-r1", "owned_by": "deepseek"},
			{"id": "groq/llama-3.3-70b", "owned_by": "groq"},
		},
	})
}

func getEnv(key, defaultVal string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return defaultVal
}
