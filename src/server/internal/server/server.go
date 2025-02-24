package server

import (
	"github.com/labstack/echo/v4"
)

func NewServer() *echo.Echo {
	e := echo.New()

	SetupRoutes(e)
	return e
}
