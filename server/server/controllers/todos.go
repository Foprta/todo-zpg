package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/Foprta/todo-zpg/server/server/auth"
	"github.com/Foprta/todo-zpg/server/server/models/items"
	"github.com/Foprta/todo-zpg/server/server/models/players"
	"github.com/Foprta/todo-zpg/server/server/models/tasks"
	"github.com/gorilla/mux"
	"github.com/lib/pq"
)

func (s *Server) CreateTodo(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
		return
	}
	var parsedBody map[string]string
	json.Unmarshal(body, &parsedBody)
	if userID, err := auth.ExtractTokenID(r); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
	} else {
		todo := tasks.ToDo{IsDone: false, Text: parsedBody["text"], UserID: userID}
		todo.Save(s.DB)
	}
}

func (s *Server) DeleteTodo(w http.ResponseWriter, r *http.Request) {
	if userID, err := auth.ExtractTokenID(r); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
	} else {
		vars := mux.Vars(r)
		todo := &tasks.ToDo{IsDone: false, UserID: userID}
		todoID, _ := strconv.ParseUint(vars["id"], 10, 32)
		todo.ID = uint(todoID)
		todo.Delete(s.DB)
	}
}

func (s *Server) GetTodos(w http.ResponseWriter, r *http.Request) {
	var userID uint
	var err error
	if userID, err = auth.ExtractTokenID(r); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
		return
	}
	todo := tasks.ToDo{UserID: userID}
	foundTodos, err := todo.GetUserTodos(s.DB)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, err.Error())
		return
	}
	res, _ := json.Marshal(foundTodos)

	fmt.Fprintf(w, string(res))
}

func (s *Server) SetTodoState(w http.ResponseWriter, r *http.Request) {
	userID, err := auth.ExtractTokenID(r)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
		return
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
		return
	}
	var parsedBody map[string]interface{} // FIXME: WTF IS HAPPENING HERE?
	json.Unmarshal(body, &parsedBody)
	todo := tasks.ToDo{UserID: userID, IsDone: parsedBody["isDone"].(bool)}
	todo.ID = uint(parsedBody["id"].(float64))
	err = todo.Update(s.DB)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	// Generate new item
	if todo.IsDone == true && todo.IsItemGenerated == false {
		player := players.Player{UserID: userID, DB: s.DB}
		player.Get()
		newWeapon, err := items.GenerateNewItem(s.DB, userID, player.Level, todo.ID)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprintf(w, err.Error())
			return
		}
		fmt.Println("weapon created")
		todo.IsItemGenerated = true
		err = todo.Update(s.DB)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprintf(w, err.Error())
			return
		}
		fmt.Println("todo chaged")
		weapon, _ := json.Marshal(newWeapon)
		w.Write(weapon)
	}
	// Error handling
	if err != nil {
		fmt.Println(err)
		if errTmp, ok := err.(*pq.Error); ok && errTmp.Code.Name() == "unique_violation" {
			w.WriteHeader(http.StatusOK)
			return
		}
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	return
}
