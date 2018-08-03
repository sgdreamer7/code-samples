package accounts

import (
	"encoding/json"
	"net/http"

	"github.com/gin-gonic/gin"

	"accounts-service/errs"
	"accounts-service/forms"
	"accounts-service/services"
)

func Create(context *gin.Context) {
	var json forms.AccountCreateForm
	if err := context.ShouldBindJSON(&json); err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var service services.AccountService
	account, err := service.Create(&json)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, account)
}

func Update(context *gin.Context) {
	var data map[string]interface{}
	bytes, err := context.GetRawData()
	json.Unmarshal(bytes, &data)

	var service services.AccountService
	account, err := service.Update(context.Param("id"), &data)
	if err != nil {
		context.AbortWithStatusJSON(err.(*errs.StatusError).Status(), gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, account)
}

func GetById(context *gin.Context) {
	var service services.AccountService
	account, err := service.GetById(context.Param("id"))
	if err != nil {
		context.AbortWithStatusJSON(err.(*errs.StatusError).Status(), gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, account)
}

func GetByQuery(context *gin.Context) {
	var form forms.AccountQueryForm
	if err := context.ShouldBindQuery(&form); err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var service services.AccountService
	account, err := service.GetByParams(form)
	if err != nil {
		context.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, account)
}

func Delete(context *gin.Context) {
	var service services.AccountService
	account, err := service.Delete(context.Param("id"))
	if err != nil {
		context.AbortWithStatusJSON(err.(*errs.StatusError).Status(), gin.H{"error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, account)
}
