package model

type Recipe struct {
	ID          int           `json:"id"`
	Name        string        `json:"name"`
	Description *string       `json:"description,omitempty"`
	Ingredients []*Ingredient `json:"ingredients,omitempty"`
	Steps       []*Step       `json:"steps,omitempty"`
}
