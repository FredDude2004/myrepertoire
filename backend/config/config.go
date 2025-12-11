package config

import (
	"fmt"
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

	host := os.Getenv("BACKEND_DB_HOST")
	user := os.Getenv("BACKEND_DB_USER")
	password := os.Getenv("BACKEND_DB_PASSWORD")
	name := os.Getenv("BACKEND_DB_NAME")
	port := os.Getenv("BACKEND_DB_PORT")

	// Construct proper DSN
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
		host, user, password, name, port,
	)

	for i := 0; i < 10; i++ {
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		log.Println("Waiting for database to be ready...", err)
		time.Sleep(3 * time.Second)
	}

	if err != nil {
		panic("failed to connect to db after retries: " + err.Error())
	}

	DB = db
	log.Println("Database connected!")
}
