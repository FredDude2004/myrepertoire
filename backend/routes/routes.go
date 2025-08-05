package routes

import (
	"github.com/gofiber/fiber/v2"
	"myrepertoire.io/backend/handlers"
)

func Setup(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/register", handlers.Register)
	api.Post("/login", handlers.Login)
	api.Post("/lines", handlers.CreateLine)
	api.Get("/lines/:userId", handlers.GetLinesByUser)
}

// TODO: Add GetLines, UpdateLine, DeleteLine
