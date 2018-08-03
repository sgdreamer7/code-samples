package migrations

import (
	"log"

	"accounts-service/database"
	"accounts-service/models"
)

func Auto(connection *database.DBConnection) {
	log.Println("Migrating database...")

	connection.DB.AutoMigrate(&models.AccountModel{})
}
