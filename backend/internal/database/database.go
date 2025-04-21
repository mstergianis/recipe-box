package database

import (
	"gitlab.com/mstergianis/recipe-box/graph/model"
	"gitlab.com/mstergianis/recipe-box/internal/dbmodel"
	"gitlab.com/mstergianis/recipe-box/internal/modelconverter"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type RecipeBoxDB interface {
	AddRecipe(recipe *model.RecipeInput) (*model.Recipe, error)
	DeleteRecipe(ID int) (int, error)
	Recipes() ([]*model.Recipe, error)
	RecipeIngredients(recipe *model.Recipe) ([]*model.Ingredient, error)
	IngredientQuantity(ingredient *model.Ingredient) (*model.Quantity, error)
	RecipeSteps(recipe *model.Recipe) ([]*model.Step, error)
}

type recipeBoxDB struct {
	*gorm.DB
}

func NewRecipeBoxDB() (RecipeBoxDB, error) {
	const connStr = "user=michael host=localhost port=5432 dbname=recipe-box sslmode=disable"
	db, err := gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	db.Logger.LogMode(logger.Info)

	rdb := &recipeBoxDB{db}
	err = rdb.AutoMigrate(
		&dbmodel.Recipe{},
		&dbmodel.Ingredient{},
		&dbmodel.Quantity{},
		&dbmodel.Step{},
	)
	if err != nil {
		return nil, err
	}

	return rdb, nil
}

func (r *recipeBoxDB) Recipes() ([]*model.Recipe, error) {
	recipes := []*dbmodel.Recipe{}
	result := r.Find(&recipes)

	if result.Error != nil {
		return nil, result.Error
	}

	return modelconverter.RecipeSliceToAPI(recipes), nil
}

func (r *recipeBoxDB) RecipeIngredients(recipe *model.Recipe) ([]*model.Ingredient, error) {
	ingredients := []*dbmodel.Ingredient{}
	tx := r.Where("recipe_id = ?", recipe.ID).Find(&ingredients)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return modelconverter.IngredientSliceToAPI(ingredients), nil
}

func (r *recipeBoxDB) RecipeSteps(recipe *model.Recipe) ([]*model.Step, error) {
	steps := []*dbmodel.Step{}
	tx := r.Where("recipe_id = ?", recipe.ID).Find(&steps)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return modelconverter.StepSliceToAPI(steps), nil
}

func (r *recipeBoxDB) IngredientQuantity(ingredient *model.Ingredient) (*model.Quantity, error) {
	quantity := &dbmodel.Quantity{}
	tx := r.Where("ingredient_id = ?", ingredient.ID).Find(quantity)
	if tx.Error != nil {
		return nil, tx.Error
	}
	return modelconverter.QuantityToAPI(quantity), nil
}

func (r *recipeBoxDB) AddRecipe(recipe *model.RecipeInput) (*model.Recipe, error) {
	dbRecipe := modelconverter.RecipeInputToDB(recipe)
	result := r.Create(dbRecipe)

	if result.Error != nil {
		return nil, result.Error
	}

	return modelconverter.RecipeToAPI(dbRecipe), nil
}

func (r *recipeBoxDB) DeleteRecipe(ID int) (int, error) {
	result := r.Delete(
		&dbmodel.Recipe{
			Model: gorm.Model{ID: uint(ID)},
		},
	)

	if result.Error != nil {
		return -1, result.Error
	}

	return ID, nil
}
