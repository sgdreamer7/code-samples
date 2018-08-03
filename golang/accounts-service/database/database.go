package database

import (
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"

	"accounts-service/config"
)

type DBConnection struct {
	DB *gorm.DB
}

type search struct {
}

var Connection *DBConnection

func Init() {
	viper := config.GetConfig()

	connectionString := fmt.Sprintf(`
    host=%s user=%s dbname=%s password=%s sslmode=disable
  `, viper.GetString("database.host"), viper.GetString("database.user"), viper.GetString("database.db"), viper.GetString("database.password"))

	connection, err := gorm.Open(viper.GetString("database.dialect"), connectionString)
	if err != nil {
		log.Fatalln(err)
	}

	environment := viper.Get("env")
	if environment == "development" || environment == "local" {
		log.Println("Development environment detected. Enabling database debug mode...")
		connection.LogMode(true)
	}

	Connection = &DBConnection{DB: connection}
}

func (connection *DBConnection) Create(data interface{}) (*DBConnection, error) {
	err := connection.DB.Create(data).Error
	return connection, err
}

func (connection *DBConnection) Delete(value interface{}, where ...interface{}) (*DBConnection, error) {
	err := connection.DB.Delete(value, where...).Error
	return connection, err
}

func (connection *DBConnection) Where(query interface{}, args ...interface{}) *gorm.DB {
	return connection.DB.Where(query, args...)
}

func (connection *DBConnection) Model(value interface{}) *gorm.DB {
	return connection.DB.Model(value)
}
