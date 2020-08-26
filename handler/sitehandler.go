package handler

import (
	"encoding/json"
	"fmt"
	"gobookstore/dao"
	"net/http"
	"strings"
)

func BookListHandler(w http.ResponseWriter, r *http.Request) {
	bookList := dao.GetAllBooks()
	returnJson, err := json.Marshal(bookList)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, string(returnJson))
}

func BookHandler(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/book/")
	fmt.Printf("Collecting info for book: %s", id)
	book := dao.GetBookByISDN(id)
	returnJson, err := json.Marshal(book)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, string(returnJson))
}
