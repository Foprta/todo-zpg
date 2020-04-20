package server

import (
	"fmt"
	"net/http"
	"server/server/controllers"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // Import postgres driver
)

type Server struct {
	Router *mux.Router
	DB     *gorm.DB
}

func Run() {
	fmt.Println("Starting server")
	server := Server{}

	server.connectToDB()
	server.loadRoutes()

	http.ListenAndServe(":80", server.Router)
}
	
func (s *Server) connectToDB() {
	db, err := gorm.Open("postgres", "host=db database=todo user=foprta password=1234 port=5432 sslmode=disable")
	if err != nil {
		fmt.Printf("Error connecting to DB: %v\n", err)
	} else {
		s.DB = db;
	}
}

func (s *Server) loadRoutes() {
	s.Router = mux.NewRouter()
	controllers.LoadRoutes(s.Router);
}