package handlers

import (
	"github.com/gofiber/fiber/v2"
	"myrepertoire.io/backend/api/config"
	"myrepertoire.io/backend/api/models"
)

func Register(c *fiber.Ctx) error {
	type req struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}
	var body req
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid input"})
	}
	user := models.User{Username: body.Username, Password: body.Password}
	result := config.DB.Create(&user)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "could not create user"})
	}
	return c.JSON(user)
}
