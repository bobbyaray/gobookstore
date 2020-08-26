// Main application for the Golang Bookstore App
package main

import (
	"fmt"
	"gobookstore/dao"
	"gobookstore/handler"
	"gobookstore/model"
	"html/template"
	"log"
	"net/http"
)

func initData() {
	var book model.Book
	book.Author = "George R.R. Martin"
	book.BookGenre = model.Adventure
	book.Isbn = "123456ABCEF"
	book.Price = 19.99
	book.Publisher = "HBO"
	book.Name = "Game of Thrones"

	dao.AddBook(book)
}

func main() {
	fmt.Println("Starting Go Bookstore......")
	initData()
	http.HandleFunc("/books", handler.BookListHandler)
	http.HandleFunc("/book/", handler.BookHandler)
	http.HandleFunc("/book/add", handler.AddBookHandler)
	http.HandleFunc("/", serveIndex)
	http.HandleFunc("/admin/", serveAdmin)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func serveIndex(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("views/index.html")
	tmpl.Execute(w, nil)
}

func serveAdmin(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("views/admin.html")
	tmpl.Execute(w, nil)
}
