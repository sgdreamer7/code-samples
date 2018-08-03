package database

import (
  "fmt"
)

func prepareConnectionString(options map[string]string) string {
  return fmt.Sprintf(`
    host=%s user=%s dbname=%s password=%s sslmode=disable
  `, options["host"], options["user"], options["dbname"], options["password"])
}
