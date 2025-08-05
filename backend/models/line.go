package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Line struct {
	gorm.Model
	Name        string
	Color       string
	OriginalPGN string
	ParsedPGN   datatypes.JSON `gorm:"type:jsonb"`
	UserID      uint
}
