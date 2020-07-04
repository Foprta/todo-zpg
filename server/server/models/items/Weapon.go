package items

import (
	"github.com/jinzhu/gorm"
)

type Weapon struct {
	gorm.Model `json:"-"`
	UserID     uint `gorm:"not null" json:"-"`
	Damage     int
	DB         *gorm.DB `gorm:"-" json:"-"`
}

func (w *Weapon) Create() error {
	return w.DB.Create(&w).Error
}

func (w *Weapon) Update() error {
	return w.DB.Save(&w).Error
}

func (w *Weapon) Get() error {
	return w.DB.Where("user_id = ?", w.UserID).Take(&w).Error
}
