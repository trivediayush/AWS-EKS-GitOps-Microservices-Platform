package main

import (
	"encoding/json"
	"net/http"
)

type Item struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Stock int    `json:"stock"`
}

var items []Item

func getItems(w http.ResponseWriter, r *http.Request) {
    if items == nil {
        items = []Item{}
    }
    json.NewEncoder(w).Encode(items)
}

func addItem(w http.ResponseWriter, r *http.Request) {
	var item Item
	json.NewDecoder(r.Body).Decode(&item)
	item.ID = len(items) + 1
	items = append(items, item)
	json.NewEncoder(w).Encode(item)
}

func main() {
	http.HandleFunc("/items", getItems)
	http.HandleFunc("/items/add", addItem)
	http.ListenAndServe(":4000", nil)
}
