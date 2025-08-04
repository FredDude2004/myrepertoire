package models

import "gorm.io/gorm"

type Line struct {
	gorm.Model
	Name        string
	Color       string
	OriginalPGN string
	ParsedPGN   string `gorm:"type:jsonb"`
	UserID      uint
}
