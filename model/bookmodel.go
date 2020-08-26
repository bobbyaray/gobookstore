package model

import "encoding/json"

type Genre int

const (
	Horror Genre = iota
	Adventure
	Kids
	SelfHelp
	Romance
	Comedy
	Educational
)

type Book struct {
	Name      string  `json:"bookname"`
	Author    string  `json:"author"`
	Price     float32 `json:"price,string"`
	Publisher string  `json:"publisher"`
	Isbn      string  `json:"isbn"`
	BookGenre Genre   `json:"genre"`
}

func (book Book) ToJson() interface{} {
	x, _ := json.Marshal(book)
	return interface{}(x)
}
