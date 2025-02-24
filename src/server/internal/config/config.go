package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port  string
	DB    DBConfig
	Redis RedisConfig
}

type DBConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DB       string
}

type RedisConfig struct {
	Addr     string
	Password string
	DB       string
}

func LoadConfig() (*Config, error) {
	if err := godotenv.Load(); err != nil {
		return nil, err
	}

	return &Config{
		Port: os.Getenv("PORT"),
		DB: DBConfig{
			Host:     os.Getenv("DATABASE_HOST"),
			Port:     os.Getenv("DATABASE_PORT"),
			User:     os.Getenv("POSTGERES_USER"),
			Password: os.Getenv("POSTGRES_PASSWORD"),
			DB:       os.Getenv("POSTGRES_DB"),
		},
		Redis: RedisConfig{
			Addr:     os.Getenv("REDIS_URL"),
			Password: os.Getenv("REDIS_PASSWORD"),
			DB:       os.Getenv("REDIS_DB"),
		},
	}, nil
}
