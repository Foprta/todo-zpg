package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Foprta/todo-zpg/server/server/auth"
	"github.com/Foprta/todo-zpg/server/server/models/items"
)

func (s *Server) GetPlayerWeapons(w http.ResponseWriter, r *http.Request) {
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
