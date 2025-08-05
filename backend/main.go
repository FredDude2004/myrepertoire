package main

import (
	"github.com/gofiber/fiber/v2"
	"log"
	"myrepertoire.io/backend/config"
	"myrepertoire.io/backend/models"
	"myrepertoire.io/backend/routes"
)

func main() {
	// Initialize a new Fiber app
	app := fiber.New()

	config.ConnectDB()
	config.DB.AutoMigrate(&models.User{}, &models.Line{})

	routes.Setup(app)

	// Start the server on port 3000
	log.Fatal(app.Listen(":3000"))
}
