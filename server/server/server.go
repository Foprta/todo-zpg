package server

import (
	"fmt"
	"net/http"

	"github.com/Foprta/todo-zpg/server/server/controllers"
	"github.com/Foprta/todo-zpg/server/server/models/players"
)

func Run() {
	fmt.Println("Starting server")
	server := controllers.Server{OnlinePlayers: make(map[uint]*players.PlayerConn)}

	server.ConnectToDB()
	server.InitRoutes()
	server.InitWebSockets()

	http.ListenAndServe(":80", server.Router)
}
