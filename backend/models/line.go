package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type Line struct {
	gorm.Model
	Name        string         `gorm:"<-update"`
	Color       string         `gorm:"<-update"`
	OriginalPGN string         `gorm:"<-update"`
	ParsedPGN   datatypes.JSON `gorm:"type:jsonb;<-update"`
	UserID      uint
}
