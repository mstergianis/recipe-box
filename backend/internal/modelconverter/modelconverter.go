package modelconverter

import (
	"gitlab.com/mstergianis/recipe-box/graph/model"
	"gitlab.com/mstergianis/recipe-box/internal/dbmodel"
)

func RecipeSliceToAPI(rs []*dbmodel.Recipe) []*model.Recipe {
	if rs == nil {
		return nil
	}
	apiRecipes := make([]*model.Recipe, len(rs))
	for i, recipe := range rs {
		apiRecipes[i] = RecipeToAPI(recipe)
	}
	return apiRecipes
}

func RecipeSliceToDB(rs []*model.Recipe) []*dbmodel.Recipe {
	if rs == nil {
		return nil
	}
	dbRecipes := make([]*dbmodel.Recipe, len(rs))
	for i, recipe := range rs {
		dbRecipes[i] = RecipeToDB(recipe)
	}
	return dbRecipes
}

func RecipeToAPI(r *dbmodel.Recipe) *model.Recipe {
	if r == nil {
		return nil
	}
	return &model.Recipe{
		ID:          int(r.ID),
		Name:        r.Name,
		Description: r.Description,
		Ingredients: IngredientSliceToAPI(r.Ingredients),
		Steps:       StepSliceToAPI(r.Steps),
	}
}

func RecipeToDB(r *model.Recipe) *dbmodel.Recipe {
	return &dbmodel.Recipe{
		Name:        r.Name,
		Description: r.Description,
		Ingredients: IngredientSliceToDB(r.Ingredients),
		Steps:       StepSliceToDB(r.Steps),
	}
}

func RecipeInputToDB(r *model.RecipeInput) *dbmodel.Recipe {
	if r == nil {
		return nil
	}
	return &dbmodel.Recipe{
		Name:        r.Name,
		Description: r.Description,
		Ingredients: IngredientInputSliceToDB(r.Ingredients),
		Steps:       StepInputSliceToDB(r.Steps),
	}
}

func IngredientSliceToAPI(is []*dbmodel.Ingredient) []*model.Ingredient {
	if is == nil {
		return nil
	}
	dbIngredients := make([]*model.Ingredient, len(is))
	for i, ingredient := range is {
		dbIngredients[i] = IngredientToAPI(ingredient)
	}
	return dbIngredients
}

func IngredientSliceToDB(is []*model.Ingredient) []*dbmodel.Ingredient {
	if is == nil {
		return nil
	}
	dbIngredients := make([]*dbmodel.Ingredient, len(is))
	for i, ingredient := range is {
		dbIngredients[i] = IngredientToDB(ingredient)
	}
	return dbIngredients
}

func IngredientInputSliceToDB(is []*model.IngredientInput) []*dbmodel.Ingredient {
	if is == nil {
		return nil
	}
	dbIngredients := make([]*dbmodel.Ingredient, len(is))
	for i, ingredient := range is {
		dbIngredients[i] = IngredientInputToDB(ingredient)
	}
	return dbIngredients
}

func IngredientToAPI(i *dbmodel.Ingredient) *model.Ingredient {
	if i == nil {
		return nil
	}
	return &model.Ingredient{
		ID:       int(i.ID),
		Name:     i.Name,
		Quantity: QuantityToAPI(i.Quantity),
	}
}

func IngredientToDB(i *model.Ingredient) *dbmodel.Ingredient {
	if i == nil {
		return nil
	}
	return &dbmodel.Ingredient{
		Name:     i.Name,
		Quantity: QuantityToDB(i.Quantity),
	}
}

func IngredientInputToDB(i *model.IngredientInput) *dbmodel.Ingredient {
	if i == nil {
		return nil
	}
	return &dbmodel.Ingredient{
		Name:     i.Name,
		Quantity: QuantityInputToDB(i.Quantity),
	}
}

func StepSliceToAPI(ss []*dbmodel.Step) []*model.Step {
	if ss == nil {
		return nil
	}
	apiSteps := make([]*model.Step, len(ss))
	for i, step := range ss {
		apiSteps[i] = StepToAPI(step)
	}
	return apiSteps
}

func StepSliceToDB(ss []*model.Step) []*dbmodel.Step {
	if ss == nil {
		return nil
	}
	dbSteps := make([]*dbmodel.Step, len(ss))
	for i, step := range ss {
		dbSteps[i] = StepToDB(step)
	}
	return dbSteps
}

func StepInputSliceToDB(ss []*model.StepInput) []*dbmodel.Step {
	if ss == nil {
		return nil
	}
	dbSteps := make([]*dbmodel.Step, len(ss))
	for i, step := range ss {
		dbSteps[i] = StepInputToDB(step)
	}
	return dbSteps
}

func StepToAPI(s *dbmodel.Step) *model.Step {
	if s == nil {
		return nil
	}
	return &model.Step{
		ID:          s.ID,
		Description: s.Description,
	}
}

func StepToDB(s *model.Step) *dbmodel.Step {
	if s == nil {
		return nil
	}
	return &dbmodel.Step{
		Description: s.Description,
	}
}

func StepInputToDB(s *model.StepInput) *dbmodel.Step {
	if s == nil {
		return nil
	}
	return &dbmodel.Step{
		Description: s.Description,
	}
}

func QuantityToAPI(q *dbmodel.Quantity) *model.Quantity {
	if q == nil {
		return nil
	}

	return &model.Quantity{
		Unit:   q.Unit,
		Amount: q.Amount,
	}
}

func QuantityToDB(q *model.Quantity) *dbmodel.Quantity {
	if q == nil {
		return nil
	}
	return &dbmodel.Quantity{
		Unit:   q.Unit,
		Amount: q.Amount,
	}
}

func QuantityInputToDB(q *model.QuantityInput) *dbmodel.Quantity {
	if q == nil {
		return nil
	}
	return &dbmodel.Quantity{
		Unit:   q.Unit,
		Amount: q.Amount,
	}
}
