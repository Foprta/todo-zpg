package controllers

import (
	"github.com/Foprta/todo-zpg/server/server/middlewares"
	"github.com/Foprta/todo-zpg/server/server/models/players"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

type Server struct {
	Router        *mux.Router
	DB            *gorm.DB
	OnlinePlayers map[uint]*players.PlayerConn
}

func (s *Server) InitRoutes() {
	s.Router = mux.NewRouter()
	s.Router.Use(middlewares.CORSMiddleware)

	api := s.Router.StrictSlash(true).PathPrefix("/api").Subrouter()
	apiV1 := api.PathPrefix("/v1").Subrouter()

	s.ApiV1Handlers(apiV1)
}
