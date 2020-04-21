package server

import (
	"fmt"
	"net/http"
	"github.com/Foprta/todo-zpg/server/server/controllers"

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
	server.Router.Use(CORS)

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
	controllers.LoadRoutes(s.Router)
}

func CORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		
		next.ServeHTTP(w, r)
		return
	})
}