package main

import (
	"github.com/FredDude2004/myrepertoire.io/backend/config"
	"github.com/FredDude2004/myrepertoire.io/backend/models"
	"github.com/FredDude2004/myrepertoire.io/backend/routes"
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
	routes.Setup(app)

	// Start the server on port 3000
	app.Run()
}
