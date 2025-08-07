package handlers

import (
	"net/http"

	"github.com/FredDude2004/myrepertoire.io/backend/config"
	"github.com/FredDude2004/myrepertoire.io/backend/models"
	"github.com/FredDude2004/myrepertoire.io/backend/utils"
	"github.com/gin-gonic/gin"
)

func CreateLine(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found in context"})
		return
	}
	currentUser := user.(models.User)

	var body struct {
		Name        string `json:"name"`
		Color       string `json:"color"`
		OriginalPGN string `json:"original_pgn"`
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}

	parsed, err := utils.ProcessPGN(body.OriginalPGN)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid PGN",
		})

		return
	}

	line := models.Line{
		Name:        body.Name,
		Color:       body.Color,
		OriginalPGN: body.OriginalPGN,
		ParsedPGN:   parsed,
		UserID:      currentUser.ID,
	}

	result := config.DB.Create(&line)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Couldn't access database",
		})
	}

	c.JSON(http.StatusOK, gin.H{})
}

func GetLinesByUser(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found in context"})
		return
	}
	currentUser := user.(models.User)

	var lines []models.Line
	result := config.DB.Where("user_id = ?", currentUser.ID).Find(&lines)
	if result.Error != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to fetch lines"})
		return
	}

	c.IndentedJSON(http.StatusOK, lines)
}

// TODO: UpdateLine
func UpdateLine(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}
	currentUser := user.(models.User)

	lineID := c.Param("id")

	var line models.Line
	if err := config.DB.
		Where("id = ? AND user_id = ?", lineID, currentUser.ID).
		First(&line).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Line not found"})
		return
	}

	var body struct {
		Name        string `json:"name"`
		Color       string `json:"color"`
		OriginalPGN string `json:"original_pgn"`
	}

	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	parsed, err := utils.ProcessPGN(body.OriginalPGN)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid PGN",
		})
		return
	}

	line.Name = body.Name
	line.Color = body.Color
	line.OriginalPGN = body.OriginalPGN
	line.ParsedPGN = parsed

	if err := config.DB.Save(&line).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not update line"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"line": line})
}

// TODO: DeleteLine
func DeletLine(c *gin.Context) {
	user, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}
	currentUser := user.(models.User)

	lineID := c.Param("id")

	var line models.Line
	if err := config.DB.
		Where("id = ? AND user_id = ?", lineID, currentUser.ID).
		First(&line).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Line not found"})
		return
	}

	if err := config.DB.Delete(&line).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete line"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Line deleted successfully"})
}
