package handler

import (
	"encoding/json"
	"fmt"
	"gobookstore/dao"
	"gobookstore/model"
	"io/ioutil"
	"log"
	"net/http"
	//"strings"
)

func AddBookHandler(w http.ResponseWriter, r *http.Request) {
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%s\n", reqBody)
	var book model.Book
	json.Unmarshal(reqBody, &book)

	dao.AddBook(book)
	w.Write([]byte("Received a POST request\n"))
}
