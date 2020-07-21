package items

import (
	"math/rand"
	"time"

	"github.com/jinzhu/gorm"
)

const (
	itemTypes = 1
	weapon    = iota // 1
)

func GenerateNewItem(DB *gorm.DB, userID, playerLevel, taskID uint) (Weapon, error) {
	var err error
	var newWeapon Weapon
	rand.Seed(time.Now().UnixNano())
	if randomedNumber := rand.Intn(itemTypes) + 1; randomedNumber == weapon {
		newWeapon = Weapon{UserID: userID, DB: DB, TaskID: taskID}
		err = newWeapon.Create(playerLevel)
	}
	return newWeapon, err
}
