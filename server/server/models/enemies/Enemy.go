package enemies

import (
	"github.com/jinzhu/gorm"
)

type Enemy struct {
	gorm.Model
	UserID    uint `gorm:"not null" json:"-"`
	Health    int
	MaxHealth int
	Level     uint
	DB        *gorm.DB `gorm:"-" json:"-"`
}

func (e *Enemy) Create() error {
	return e.DB.Create(&e).Error
}

func (e *Enemy) Update() error {
	return e.DB.Save(&e).Error
}

func (e *Enemy) Get() error {
	return e.DB.Where("user_id = ?", e.UserID).Take(&e).Error
}
