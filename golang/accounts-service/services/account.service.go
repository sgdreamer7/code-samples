package services

import (
	"errors"
	"net/http"
	"strings"

	"accounts-service/database"
	"accounts-service/errs"
	"accounts-service/forms"
	"accounts-service/models"
	"accounts-service/utils"
)

type AccountService struct {
}

func getById(id string) (*models.AccountModel, error) {
	var model models.AccountModel

	db := database.Connection.Where(map[string]interface{}{"id": id}).First(&model)
	if db.RecordNotFound() {
		return nil, errs.NewStatusError(http.StatusNotFound, "Account not found")
	}

	if db.Error != nil {
		return nil, errs.NewStatusError(http.StatusBadRequest, db.Error.Error())
	}

	return &model, nil
}

func (service *AccountService) Create(data *forms.AccountCreateForm) (*models.AccountModel, error) {
	var firstName, lastName string
	utils.Unpack(strings.Fields(data.Name), &firstName, &lastName)

	var account models.AccountModel = models.AccountModel{
		FirstName:                 firstName,
		LastName:                  lastName,
		Email:                     data.Email,
		Password:                  data.Password,
		RefreshToken:              data.RefreshToken,
		PasswordConfirmationToken: data.PasswordConfirmationToken,
	}

	_, err := database.Connection.Create(&account)

	return &account, err
}

func (service *AccountService) Update(id string, data *map[string]interface{}) (*models.AccountModel, error) {
	account, err := getById(id)
	if err != nil {
		return nil, err
	}

	if err := database.Connection.Model(account).Updates(*data).Error; err != nil {
		return nil, err
	}

	return account, err
}

func (service *AccountService) GetById(id string) (*models.AccountModel, error) {
	return getById(id)
}

func (service *AccountService) GetByParams(params forms.AccountQueryForm) (*models.AccountModel, error) {
	var model models.AccountModel

	if params.Email == nil && params.RefreshToken == nil {
		return nil, errors.New("Parameters not specified")
	}

	if database.Connection.Where(&params).First(&model).RecordNotFound() {
		return nil, errors.New("Account not found")
	}

	return &model, nil
}

func (service *AccountService) Delete(id string) (*models.AccountModel, error) {
	account, err := getById(id)
	if err != nil {
		return nil, err
	}

	if _, err := database.Connection.Delete(account); err != nil {
		return nil, err
	}

	return account, err
}
