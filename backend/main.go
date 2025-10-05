package main

import (
	"github.com/FredDude2004/myrepertoire/backend/config"
	"github.com/FredDude2004/myrepertoire/backend/models"
	"github.com/FredDude2004/myrepertoire/backend/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"os"
)

func init() {
	config.ConnectDB()
	config.DB.AutoMigrate(&models.User{}, &models.Line{})
}

func main() {
	// Initialize a new Fiber app
	app := gin.Default()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{
			"http://myrepertoire.cloud",
			"https://myrepertoire.cloud",
			"http://api.myrepertoire.cloud",
			"https://api.myrepertoire.cloud",
		},
		AllowMethods:     []string{"POST", "GET", "OPTIONS", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	routes.Setup(app)

	// Start the server on port 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // fallback
	}
	app.Run(":" + port)
}
