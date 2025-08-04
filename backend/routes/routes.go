package routes

import (
	"github.com/gofiber/fiber/v2"
	"myrepertoire.io/backend/handlers"
)

func Setup(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/register", handlers.Register)
	api.Post("/lines", handlers.CreateLine)
	// TODO: Add GetLines, UpdateLine, DeleteLine
}
