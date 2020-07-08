package items

import (
	"fmt"

	"github.com/Foprta/todo-zpg/server/server/models/players"
	"github.com/jinzhu/gorm"
)

type Weapon struct {
	gorm.Model
	UserID uint `gorm:"not null" json:"-"`
	TaskID uint `gorm:"unique" json:"-"`
	Damage uint
	DB     *gorm.DB `gorm:"-" json:"-"`
}

func (w *Weapon) Create() error {
	player := players.Player{UserID: w.UserID, DB: w.DB}
	err := player.Get()
	if err != nil {
		return err
	}
	fmt.Println(player)
	w.Damage = player.Level
	return w.DB.Create(&w).Error
}

func (w *Weapon) Update() error {
	return w.DB.Save(&w).Error
}

func (w *Weapon) Get() error {
	return w.DB.Where("user_id = ?", w.UserID).Take(&w).Error
}

// GetPlayerWeapons s
func (w *Weapon) GetPlayerWeapons() (*[]Weapon, error) {
	weapons := []Weapon{}
	err := w.DB.Model(&Weapon{}).Where("user_id = ?", w.UserID).Find(&weapons).Error
	return &weapons, err
}
