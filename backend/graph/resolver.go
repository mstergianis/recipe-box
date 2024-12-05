package graph

import (
	"gitlab.com/mstergianis/recipe-box/internal/database"
)

//go:generate go run github.com/99designs/gqlgen generate

type Resolver struct {
	db database.RecipeBoxDB
}

func NewResolver(db database.RecipeBoxDB) *Resolver {
	return &Resolver{
		db: db,
	}
}
