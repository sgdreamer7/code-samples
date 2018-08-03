package accounts

import (
  "github.com/gin-gonic/gin"
)

func InitRoutes(router *gin.Engine) {
  accounts := router.Group("accounts")
  {
    accounts.POST("/", Create)
    accounts.GET("/", GetByQuery)
    accounts.PUT("/:id", Update)
    accounts.GET("/:id", GetById)
    accounts.DELETE("/:id", Delete)
  }
}
