package model

type Ingredient struct {
	ID       int       `json:"id"`
	Name     string    `json:"name"`
	Quantity *Quantity `json:"quantity"`
}
