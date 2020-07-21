package tasks

import (
	"github.com/jinzhu/gorm"
)

type ToDo struct {
	gorm.Model
	UserID          uint `gorm:"not null"`
	IsDone          bool
	Text            string
	IsItemGenerated bool
}

func (t *ToDo) Save(db *gorm.DB) (*ToDo, error) {
	err := db.Create(&t).Error
	return t, err
}

func (t *ToDo) Delete(db *gorm.DB) (*ToDo, error) {
	err := db.Delete(&t).Error
	return t, err
}

func (t *ToDo) Update(db *gorm.DB) error {
	var todo ToDo
	err := db.Where("user_id = ? AND id = ?", t.UserID, t.ID).Take(&todo).Error
	if err != nil {
		return err
	}
	todo.IsDone = t.IsDone
	todo.IsItemGenerated = t.IsItemGenerated
	err = db.Save(&todo).Error
	return err
}

func (t *ToDo) GetUserTodos(db *gorm.DB) (*[]ToDo, error) {
	todos := []ToDo{}
	err := db.Model(&ToDo{}).Where("user_id = ?", t.UserID).Find(&todos).Error
	return &todos, err
}
