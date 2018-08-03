package models

import (
  "time"

  "github.com/jinzhu/gorm"
  "github.com/satori/go.uuid"
)

type BaseModel struct {
  ID string `json:"id" gorm:"type:varchar(36); primary_key; not null"`
  CreatedAt time.Time `json:"created_at"`
  UpdatedAt time.Time `json:"updated_at"`
  DeletedAt *time.Time `json:"deleted_at"`
}

func (model *BaseModel) BeforeCreate(scope *gorm.Scope) error {
  scope.SetColumn("ID", uuid.NewV4().String())
  return nil
}
