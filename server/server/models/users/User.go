package users

import (
	"fmt"

	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	gorm.Model
	Email    string `gorm:"type:varchar(100);unique_index"`
	Password string
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func isPasswordMatching(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func (u *User) Create(db *gorm.DB) (*User, error) {
	if hash, err := hashPassword(u.Password); err != nil {
		fmt.Println(err)
	} else {
		u.Password = hash
	}
	err := db.Create(&u).Error
	return u, err
}

func (u *User) Login(db *gorm.DB) (uint32, error) {
	var err error
	user := User{}
	if err = db.Model(User{}).Where("email = ?", u.Email).Take(&user).Error; err != nil {
		return 0, err
	}
	if isPasswordMatching(u.Password, user.Password) == true {
		return uint32(user.ID), nil
	}
	return 0, fmt.Errorf("Error checking password")
}

func (u *User) GetUser(db *gorm.DB) (*User, error) {
	user := User{}
	err := db.Model(&User{}).Where(u).Find(&user).Error
	return &user, err
}
