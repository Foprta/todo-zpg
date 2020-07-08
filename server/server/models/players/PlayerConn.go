package players

import (
	"encoding/json"
	"fmt"

	"github.com/Foprta/todo-zpg/server/server/models/enemies"
	"github.com/gorilla/websocket"
)

type GUI struct {
	P *Player        `json:"player,omitempty"`
	E *enemies.Enemy `json:"enemy,omitempty"`
}

type PlayerConn struct {
	ws     []*websocket.Conn
	Player *Player
}

func (pc *PlayerConn) AddWs(ws *websocket.Conn) {
	pc.ws = append(pc.ws, ws)
	*pc.Player.IsOnline++
	if *pc.Player.IsOnline == 1 {
		go pc.sender()
	}
}

func (pc *PlayerConn) RemoveWs(i int) bool {
	pc.ws[i] = pc.ws[len(pc.ws)-1]
	pc.ws = pc.ws[:len(pc.ws)-1]
	*pc.Player.IsOnline--
	if *pc.Player.IsOnline == 0 {
		return true
	}
	return false
}

func (pc *PlayerConn) sender() {
	fmt.Println(pc.Player.UserID, "sender started")
	defer fmt.Println(pc.Player.UserID, "sender stopped")
	for {
		ui := <-pc.Player.Events.Event
		pc.Player.DebounceEventsDeathTimer()
		fmt.Println(pc.Player.UserID, "Msg sending")
		gui, err := json.Marshal(ui)
		if err != nil {
			fmt.Println("error marshaling gui")
		}
		for index, element := range pc.ws {
			fmt.Println(index)
			if err := element.WriteMessage(websocket.TextMessage, gui); err != nil {
				if pc.RemoveWs(index) {
					return
				}
			}
		}
	}
}
