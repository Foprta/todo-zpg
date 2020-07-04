package controllers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/Foprta/todo-zpg/server/server/auth"
	"github.com/Foprta/todo-zpg/server/server/middlewares"
	"github.com/Foprta/todo-zpg/server/server/models/players"
	"github.com/gorilla/websocket"
)

func (s *Server) InitWebSockets() {
	s.Router.HandleFunc("/ws", middlewares.AuthMiddleware(s.wsHandler))
}

func (s *Server) wsHandler(w http.ResponseWriter, r *http.Request) {
	userID, err := auth.ExtractTokenID(r)
	if err != nil {
		http.Error(w, "User not found", 403)
		return
	}
	ws, err := websocket.Upgrade(w, r, nil, 1024, 1024)
	if _, ok := err.(websocket.HandshakeError); ok {
		http.Error(w, "Not a websocket handshake", 400)
		return
	} else if err != nil {
		return
	}
	if _, ok := s.OnlinePlayers[userID]; !ok {
		fmt.Println("NO_ONLINE")
		player := &players.Player{UserID: userID, IsOnline: new(uint), DB: s.DB}
		player.GenerateOfflineEvents()
		player.StartEvents()
		playerConn := &players.PlayerConn{Player: player}
		playerConn.AddWs(ws)
		s.OnlinePlayers[userID] = playerConn
		go func() {
			select {
			case <-s.OnlinePlayers[userID].Player.Events.StopEvent:
				fmt.Println("STOPPED")
				time.AfterFunc(1*time.Second, func() { // This timer to prevent race with Player.StartEvents() -> defer p.StopEvents()
					delete(s.OnlinePlayers, userID)
				})
			}
		}()
	} else {
		s.OnlinePlayers[userID].AddWs(ws)
	}
}
