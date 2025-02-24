package server

import (
	"educonnect/internal/server/handlers"

	"github.com/labstack/echo/v4"
)

func SetupRoutes(echo *echo.Echo) {
	// Initialize handlers
	healthHandler := handlers.NewHealthHandler()

	// Endpoints
	e := echo.Group("/api/v1")

	e.GET("/health", healthHandler.HealthCheck)
}
