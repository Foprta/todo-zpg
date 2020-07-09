package controllers

import (
	"github.com/Foprta/todo-zpg/server/server/middlewares"
	"github.com/gorilla/mux"
)

func (s *Server) ApiV1Handlers(router *mux.Router) {
	router.Use(mux.CORSMethodMiddleware(router))
	// USERS
	router.HandleFunc("/users/create", s.CreateUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/users/login", s.LoginUser).Methods("POST", "OPTIONS")
	router.HandleFunc("/users", middlewares.AuthMiddleware(s.GetCurrentUser)).Methods("GET", "OPTIONS")
	// TASKS
	router.HandleFunc("/todos/create", middlewares.AuthMiddleware(s.CreateTodo)).Methods("POST", "OPTIONS")
	router.HandleFunc("/todos/list", middlewares.AuthMiddleware(s.GetTodos)).Methods("GET", "OPTIONS")
	router.HandleFunc("/todos", middlewares.AuthMiddleware(s.SetTodoState)).Methods("POST", "OPTIONS")
	router.HandleFunc("/todos/{id:[0-9]+}", middlewares.AuthMiddleware(s.DeleteTodo)).Methods("DELETE", "OPTIONS")
	// PLAYERS
	router.HandleFunc("/players/weapons", middlewares.AuthMiddleware(s.GetWeapons)).Methods("GET", "OPTIONS")
	router.HandleFunc("/players/weapons/select/{id:[0-9]}", middlewares.AuthMiddleware(s.SelectWeapon)).Methods("GET", "OPTIONS")

}
