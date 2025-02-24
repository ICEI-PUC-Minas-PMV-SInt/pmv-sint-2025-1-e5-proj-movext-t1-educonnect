package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"educonnect/internal/config"
	"educonnect/internal/server"
)

func main() {
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Falha ao carregar configurações: %v", err)
	}

	e := server.NewServer()

	go func() {
		if err := e.Start(":" + cfg.Port); err != nil {
			e.Logger.Info("Desligando o servidor...")
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}
}
