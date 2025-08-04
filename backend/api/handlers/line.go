package handlers

import (
	"github.com/gofiber/fiber/v2"
	"myrepertoire.io/backend/api/config"
	"myrepertoire.io/backend/api/models"
	"myrepertoire.io/backend/api/utils"
)

func CreateLine(c *fiber.Ctx) error {
	type req struct {
		Name        string `json:"name"`
		Color       string `json:"color"`
		OriginalPGN string `json:"original_pgn"`
		UserID      uint   `json:"user_id"`
	}
	var body req
	if err := c.BodyParser(&body); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid input"})
	}

	parsed, err := utils.ProcessPGN(body.OriginalPGN)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid PGN"})
	}

	line := models.Line{
		Name:        body.Name,
		Color:       body.Color,
		OriginalPGN: body.OriginalPGN,
		ParsedPGN:   parsed, UserID: body.UserID,
	}

	result := config.DB.Create(&line)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"error": "could not save line"})
	}

	return c.JSON(line)
}

// TODO: add functions for GetLines, UpdateLine, DeleteLine
