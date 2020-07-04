package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/Foprta/todo-zpg/server/server/auth"
	"github.com/Foprta/todo-zpg/server/server/models/enemies"
	"github.com/Foprta/todo-zpg/server/server/models/players"
	"github.com/Foprta/todo-zpg/server/server/models/users"
	// "github.com/gorilla/mux"
	// "github.com/jinzhu/gorm"
)

func (s *Server) CreateUser(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return
	}
	var newUser users.User
	json.Unmarshal(body, &newUser)
	user, err := newUser.Create(s.DB)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
		return
	}
	newPlayer := players.Player{UserID: user.ID, DB: s.DB}
	newEnemy := enemies.Enemy{UserID: user.ID, DB: s.DB}
	err = newPlayer.Create()
	err = newEnemy.Create()
	token, err := auth.CreateToken(uint32(user.ID))
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, err.Error())
		return
	}
	fmt.Fprintf(w, token)
}

func (s *Server) LoginUser(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return
	}
	var oldUser users.User
	json.Unmarshal(body, &oldUser)
	if userID, err := oldUser.Login(s.DB); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
	} else {
		if token, err := auth.CreateToken(uint32(userID)); err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, err.Error())
		} else {
			fmt.Fprintf(w, token)
		}
	}
}

func (s *Server) GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	if userID, err := auth.ExtractTokenID(r); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
	} else {
		user := users.User{}
		user.ID = userID
		foundUser, err := user.GetUser(s.DB)
		if err != nil {
			fmt.Fprintf(w, err.Error())
		} else {
			res, _ := json.Marshal(foundUser)
			fmt.Fprintf(w, string(res))
		}
	}
}
