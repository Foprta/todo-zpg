package players

import (
	"fmt"
	"math"
	"math/rand"
	"time"

	"github.com/Foprta/todo-zpg/server/server/models/enemies"
	"github.com/Foprta/todo-zpg/server/server/models/items"
	"github.com/Foprta/todo-zpg/server/server/utils"

	"github.com/jinzhu/gorm"
)

type Player struct {
	gorm.Model
	UserID     uint `gorm:"not null" json:"-"`
	Health     int
	MaxHealth  int
	Level      uint
	State      uint
	Experience uint
	Damage     uint
	Events     playerEventsChannel `gorm:"-" json:"-"`
	IsOnline   *uint               `gorm:"-" json:"-"`
	DB         *gorm.DB            `gorm:"-" json:"-"`
}

type playerEventsChannel struct {
	StopEvent chan bool
	StopTimer *<-chan time.Time
	Event     chan GUI
}

const (
	eventsTimerDeath = 10
	eventsInterval   = 4
)

const (
	roaming  = iota // 0
	fighting = iota // 1
)

func (p *Player) Create() error {
	p.MaxHealth = 100
	p.Health = 100
	p.Level = 1
	p.Experience = 0
	p.State = roaming
	return p.DB.Create(&p).Error
}

func (p *Player) Get() error {
	return p.DB.Where("user_id = ?", p.UserID).Take(&p).Error
}

func (p *Player) Update() error {
	return p.DB.Save(&p).Error
}

func (p *Player) DebounceEventsDeathTimer() {
	*p.Events.StopTimer = time.After(eventsTimerDeath * time.Second)
}

func (p *Player) StartEvents() {
	stopTimer := time.After(eventsTimerDeath * time.Second)
	stopEvent := make(chan bool)
	event := make(chan GUI)
	go func() {
		defer p.StopEvents()
		eventTimer := time.NewTicker(eventsInterval * time.Second)
		for {
			select {
			case <-eventTimer.C:
				if *p.IsOnline > 0 {
					event <- p.generateOnlineEvents()
				} else {
					p.generateOnlineEvents()
				}
			case <-stopTimer:
				return
			}
		}
	}()
	p.Events = playerEventsChannel{StopEvent: stopEvent, StopTimer: &stopTimer, Event: event}
}

func (p *Player) StopEvents() {
	fmt.Println(p.UserID, "is offline")
	p.Events.StopEvent <- true
}

// Fighting

func (p *Player) onlineSetFighting() GUI {
	enemy := &enemies.Enemy{DB: p.DB, UserID: p.UserID}
	enemy.Get()
	p.setFighting(enemy)
	if err := enemy.Update(); err != nil {
		fmt.Println(err)
	}
	p.Update()
	return GUI{P: p, E: enemy}
}

func (p *Player) setFighting(enemy *enemies.Enemy) {
	enemy.Health = int(p.Level)
	enemy.MaxHealth = int(p.Level)
	enemy.Level = p.Level
	p.State = fighting
}

func (p *Player) fight(enemy *enemies.Enemy) GUI {
	enemy.Health -= int(p.Damage)
	p.Health -= int(enemy.Level)
	if enemy.Health <= 0 {
		p.addExp(enemy.Level)
		p.setRoaming()
	}
	if p.Health <= 0 {
		p.Health = p.MaxHealth
	}
	return GUI{P: p, E: enemy}
}

func (p *Player) onlineFight() GUI {
	enemy := &enemies.Enemy{DB: p.DB, UserID: p.UserID}
	err := enemy.Get()
	if err != nil {
		fmt.Println(err)
		return GUI{}
	}
	p.fight(enemy)
	p.Update()
	if err = enemy.Update(); err != nil {
		fmt.Println(err)
	}
	return GUI{P: p, E: enemy}
}

// Roaming

func (p *Player) onlineSetRoaming() GUI {
	p.setRoaming()
	p.Update()
	return GUI{P: p}
}

func (p *Player) setRoaming() GUI {
	p.State = roaming
	return GUI{P: p}
}

func (p *Player) onlineRoam() GUI {
	p.roam()
	p.Update()
	return GUI{P: p}
}

func (p *Player) roam() GUI {
	p.Health = utils.Min(p.Health+int(p.Level), p.MaxHealth)
	return GUI{P: p}
}

// Level system

func (p *Player) addExp(amount uint) GUI {
	p.Experience += amount
	for neededExp := expForNextLevel(p.Level); p.Experience >= neededExp; neededExp = expForNextLevel(p.Level) {
		p.Experience -= neededExp
		p.levelUp()
	}
	return GUI{P: p}
}

func (p *Player) levelUp() GUI {
	p.Level++
	p.MaxHealth = int(p.Level * 100)
	return GUI{P: p}
}

// Items handling
func (p *Player) RecalculateStats() error {
	var weapon = items.Weapon{UserID: p.UserID, DB: p.DB}
	err := weapon.GetCurrent()
	if err != nil {
		return err
	}
	fmt.Println("weapon found")
	p.Damage = weapon.Damage
	err = p.Update()
	if err != nil {
		return err
	}
	fmt.Println("")
	return nil
}

// Generating events after being offline
func (p *Player) GenerateOfflineEvents() {
	p.DB.Where("user_id = ?", p.UserID).Take(&p)
	enemy := &enemies.Enemy{UserID: p.UserID, DB: p.DB}
	enemy.Get()
	eventsSinceLastUpdate := time.Since(p.UpdatedAt).Seconds() / eventsInterval
	for i := 0; i < int(eventsSinceLastUpdate); i++ {
		switch p.State {
		case fighting:
			p.fight(enemy)
		case roaming:
			p.roam()

			rand.Seed(time.Now().UnixNano())
			if rand.Intn(5) == fighting {
				p.setFighting(enemy)
			}
		}
	}
	p.Update()
	enemy.Update()
}

// Generating events while being online

func (p *Player) generateOnlineEvents() GUI {
	var gui GUI
	p.DB.Where("user_id = ?", p.UserID).Take(&p)
	switch p.State {
	case roaming:
		rand.Seed(time.Now().UnixNano())
		if rand.Intn(5) == fighting {
			gui = p.onlineSetFighting()
		} else {
			gui = p.onlineRoam()
		}
	case fighting:
		gui = p.onlineFight()
	default:
	}
	return gui
}

// Utils

func expForNextLevel(currentLevel uint) uint {
	return uint(100 + (50 * math.Pow(float64(currentLevel-1), 1.5)))
}
