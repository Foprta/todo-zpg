package controllers

import (
	"github.com/gorilla/mux"
	"fmt"
	"net/http"
	"encoding/json"
)

func ApiV1Handlers(router *mux.Router) {
	router.HandleFunc("/", getTasks).Methods("GET")
}

type Message struct {
	Name string
}

func getTasks(w http.ResponseWriter, r *http.Request) {
	m := Message{"ANA"}
	res, _ := json.Marshal(m)
	fmt.Fprintf(w,  string(res))
}