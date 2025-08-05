package handlers

import (
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"myrepertoire.io/backend/config"
	"myrepertoire.io/backend/models"
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

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(body.Password), 12)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "could not hash password"})
	}

	user := models.User{
		Username: body.Username,
		Password: string(hashedPassword),
	}

	result := config.DB.Create(&user)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "could not create user"})
	}

	return c.JSON(fiber.Map{
		"message": "user created",
		"user_id": user.ID,
	})
}

func Login(c *fiber.Ctx) error {
	type req struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	var body req
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid input"})
	}

	var user models.User
	result := config.DB.Where("username = ?", body.Username).First(&user)
	if result.Error != nil {
		return c.Status(400).JSON(fiber.Map{"error": "user not found"})
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "incorrect password"})
	}

	return c.JSON(fiber.Map{
		"message": "login successful",
		"user_id": user.ID,
	})
}
