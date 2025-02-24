package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type HealthHandler struct{}

func NewHealthHandler() *HealthHandler {
	return &HealthHandler{}
}

type HealthReturn struct {
	Status  string
	Message string
}

func (h *HealthHandler) HealthCheck(c echo.Context) error {
	return c.JSON(http.StatusOK, &HealthReturn{
		Status:  "Healthy",
		Message: "Todos os sistemas operando normalmente",
	})
}
