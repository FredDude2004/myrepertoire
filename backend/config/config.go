package config

import (
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var db *gorm.DB
	var err error
	dsn := os.Getenv("DB")

	for i := 0; i < 10; i++ { // try 10 times
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		log.Println("Waiting for database to be ready...")
		time.Sleep(3 * time.Second)
	}

	if err != nil {
		panic("failed to connect to db after retries: " + err.Error())
	}

	DB = db
	log.Println("Database connected!")
}
