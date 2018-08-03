package api

import (
	"log"

	"github.com/fvbock/endless"
	"github.com/gin-gonic/gin"

	controller "accounts-service/api/accounts"
	"accounts-service/config"
)

func Init() {
	viper := config.GetConfig()
	port := viper.GetString("api.port")
	router := gin.New()

	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	controller.InitRoutes(router)

	router.NoRoute(func(context *gin.Context) {
		context.AbortWithStatus(404)
	})

	err := endless.ListenAndServe(port, router)
	if err != nil {
		log.Fatalln(err)
	}
}
