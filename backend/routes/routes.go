package routes

import (
	"github.com/FredDude2004/myrepertoire.io/backend/handlers"
	"github.com/FredDude2004/myrepertoire.io/backend/middleware"
	"github.com/gin-gonic/gin"
)

func Setup(app *gin.Engine) {
	app.POST("/signup", handlers.Signup)
	app.POST("/login", handlers.Login)
	app.POST("/logout", handlers.Logout)
	app.GET("/validate", middleware.RequireAuth, handlers.Validate)

	api := app.Group("/api")
	api.POST("/lines", middleware.RequireAuth, handlers.CreateLine)
	api.GET("/lines", middleware.RequireAuth, handlers.GetLinesByUser)
	api.PATCH("/lines/:id", middleware.RequireAuth, handlers.UpdateLine)
	api.DELETE("/lines/:id", middleware.RequireAuth, handlers.DeletLine)
}
