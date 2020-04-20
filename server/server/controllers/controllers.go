package controllers

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

func LoadRoutes(router *mux.Router) {
	router.HandleFunc("/", createTask)
}

func createTask(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to this not life-changing API.")
}