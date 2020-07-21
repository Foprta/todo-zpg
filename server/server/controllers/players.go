package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/Foprta/todo-zpg/server/server/auth"
	"github.com/Foprta/todo-zpg/server/server/models/items"
	"github.com/Foprta/todo-zpg/server/server/models/players"
	"github.com/gorilla/mux"
)

func (s *Server) GetWeapons(w http.ResponseWriter, r *http.Request) {
	var userID uint
	var err error
	if userID, err = auth.ExtractTokenID(r); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
		return
	}
	weapon := items.Weapon{UserID: userID, DB: s.DB}
	weapons, err := weapon.GetPlayerWeapons()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, err.Error())
		return
	}
	res, _ := json.Marshal(weapons)

	fmt.Fprintf(w, string(res))
}

func (s *Server) SelectWeapon(w http.ResponseWriter, r *http.Request) {
	var userID uint
	var err error
	if userID, err = auth.ExtractTokenID(r); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
		return
	}
	vars := mux.Vars(r)
	weapon := items.Weapon{UserID: userID, DB: s.DB}
	weaponID, _ := strconv.ParseUint(vars["id"], 10, 32)
	weapon.ID = uint(weaponID)
	weapon.Get()
	err = weapon.Select()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, err.Error())
		return
	}
	fmt.Println("weapin found")
	player := players.Player{UserID: userID, DB: s.DB}
	player.Get()
	fmt.Println("player found")
	err = player.RecalculateStats()
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
		return
	}
	fmt.Println("player recalculated")
	res, _ := json.Marshal(weapon)

	fmt.Fprintf(w, string(res))
}
