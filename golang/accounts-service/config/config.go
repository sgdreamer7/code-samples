package config

import (
  "fmt"
  "log"
  "flag"
  "strings"

  "github.com/spf13/viper"
)

var config *viper.Viper

func initViper(env string) *viper.Viper {
  var err error

  log.Printf("Initializing %s environment...\n", env)

  newViper := viper.New()
  newViper.SetConfigType("yaml")
  newViper.SetConfigName(env)
  newViper.AddConfigPath("config/")

  newViper.SetEnvPrefix(fmt.Sprintf("insake_accounts_service_%s", env))
  newViper.AutomaticEnv()

  newViper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

  err = newViper.ReadInConfig()
  if err != nil {
    log.Panicln("Error on reading configuration file")
  }

  config = newViper

  return newViper
}

func Init() *viper.Viper {
  environment := flag.String("env", "development", "application environment")

  flag.Usage = func() {
    log.Fatalln("Usage: server -env={mode}")
  }

  flag.Parse()

  return initViper(*environment)
}

func GetConfig() *viper.Viper {
  return config
}
