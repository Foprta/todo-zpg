package controllers

import (
	"github.com/gorilla/mux"
)

func LoadRoutes(router *mux.Router) {
	api := router.StrictSlash(true).PathPrefix("/api").Subrouter()
	apiV1 := api.PathPrefix("/v1").Subrouter();
	ApiV1Handlers(apiV1)
}