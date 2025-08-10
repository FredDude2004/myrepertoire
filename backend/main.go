package main

import (
	"github.com/FredDude2004/myrepertoire.io/backend/config"
	"github.com/FredDude2004/myrepertoire.io/backend/models"
	"github.com/FredDude2004/myrepertoire.io/backend/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	config.LoadEnvVars()
	config.ConnectDB()
	config.DB.AutoMigrate(&models.User{}, &models.Line{})
}

func main() {
	// Initialize a new Fiber app
	app := gin.Default()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"POST", "GET", "OPTIONS", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: true,
	}))

	routes.Setup(app)

	// Start the server on port 8080
	app.Run()
}
