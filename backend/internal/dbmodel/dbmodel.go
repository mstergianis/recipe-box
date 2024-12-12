package dbmodel

import "gorm.io/gorm"

type Recipe struct {
	gorm.Model
	Name        string
	Description *string
	Ingredients []*Ingredient
	Steps       []*Step
}

type Ingredient struct {
	gorm.Model
	RecipeID int
	Name     string
	Quantity *Quantity
}

type Quantity struct {
	gorm.Model
	IngredientID int
	Unit         string
	Amount       float64
}

type Step struct {
	gorm.Model
	ID          int
	RecipeID    int
	Description string
}
