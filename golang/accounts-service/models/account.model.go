package models

import (
  "log"

  "github.com/jinzhu/gorm"
  "golang.org/x/crypto/bcrypt"
)

type AccountModel struct {
  BaseModel
  Email string `json:"email" gorm:"not null; unique_index"`
  FirstName string `json:"first_name" gorm:"column:first_name"`
  LastName string `json:"last_name" gorm:"column:last_name"`
  Password string `json:"password" gorm:"not null"`
  ResetPasswordToken string `json:"reset_password_token" gorm:"unique_index; default:NULL"`
  PasswordConfirmationToken string `json:"password_confirmation_token" gorm:"unique_index; default:NULL"`
  RefreshToken string `json:"refresh_token" gorm:"unique_index; not null"`
}

func (AccountModel) TableName() string {
  return "accounts"
}

func (model *AccountModel) BeforeCreate(scope *gorm.Scope) error {
  if baseError := model.BaseModel.BeforeCreate(scope); baseError != nil {
    return baseError
  }

  hash, err := bcrypt.GenerateFromPassword([]byte(model.Password), bcrypt.DefaultCost)
  if err != nil {
    log.Fatalln(err)
  }

  scope.SetColumn("Password", string(hash))

  return nil
}
