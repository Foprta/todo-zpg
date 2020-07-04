package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/Foprta/todo-zpg/server/server/auth"
	"github.com/Foprta/todo-zpg/server/server/models/tasks"
	// "github.com/gorilla/mux"
	// "github.com/jinzhu/gorm"
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
		return
	} else {
		todo := tasks.ToDo{IsDone: false, Text: parsedBody["text"], UserID: userID}
		todo.Save(s.DB)
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
	foundTodos, err := todo.GetTodos(s.DB)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		fmt.Fprintf(w, err.Error())
		return
	}
	res, _ := json.Marshal(foundTodos)
	fmt.Fprintf(w, string(res))

}

func (s *Server) SetTodoState(w http.ResponseWriter, r *http.Request) {
	if userID, err := auth.ExtractTokenID(r); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		fmt.Fprintf(w, err.Error())
		return
	} else {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			fmt.Fprintf(w, err.Error())
			return
		}
		var parsedBody map[string]interface{} // FIXME: WTF IS HAPPENING HERE?
		json.Unmarshal(body, &parsedBody)
		fmt.Println(parsedBody)
		todo := tasks.ToDo{UserID: userID, IsDone: parsedBody["isDone"].(bool)}
		todo.ID = uint(parsedBody["id"].(float64))
		err = todo.Update(s.DB)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Fprintf(w, err.Error())
			return
		}
		w.WriteHeader(http.StatusOK)
		return
	}
}
