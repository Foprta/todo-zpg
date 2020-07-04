package controllers

import (
	"fmt"

	"github.com/Foprta/todo-zpg/server/server/models/enemies"
	"github.com/Foprta/todo-zpg/server/server/models/players"
	"github.com/Foprta/todo-zpg/server/server/models/tasks"
	"github.com/Foprta/todo-zpg/server/server/models/users"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // Import postgres driver
)

func (s *Server) ConnectToDB() {
	db, err := gorm.Open("postgres", "host=db database=todo user=foprta password=1234 port=5432 sslmode=disable")
	if err != nil {
		fmt.Printf("Error connecting to DB: %v\n", err)
		return
	}
	s.DB = db

	s.DB.AutoMigrate(&tasks.ToDo{}, &users.User{}, &players.Player{}, &enemies.Enemy{})
}
