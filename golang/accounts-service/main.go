package main

import (
	"log"

	"accounts-service/api"
	"accounts-service/config"
	"accounts-service/database"
	"accounts-service/migrations"
)

func main() {
	log.Println("Running the auth service...")

	config.Init()
	database.Init()
	migrations.Auto(database.Connection)

	api.Init()
}
