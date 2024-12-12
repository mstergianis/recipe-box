"use client";
import { gql } from "@/graphql";
import {
  AddRecipeMutation,
  AddRecipeMutationVariables,
  Ingredient,
  IngredientInput,
  RecipeInput,
  Step,
} from "@/graphql/graphql";
import { MutationFunction, useMutation } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useReducer, useState } from "react";

const ADD_RECIPE = gql(`
mutation AddRecipe($recipe: RecipeInput) {
  addRecipe(recipe: $recipe) { id }
}
`);

export default function NewRecipeButton() {
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  const [recipe, recipeDispatch] = useReducer(recipeReducer, {
    name: "",
  });

  const [addRecipe, { loading }] = useMutation(ADD_RECIPE);

  if (loading) {
    return <div>Loading</div>;
  }

  if (isAddingRecipe) {
    return (
      <Wrapper>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <input
            className="text-lg block"
            placeholder="Recipe Name"
            value={recipe.name}
            onChange={(e) => {
              recipeDispatch({ type: "updateName", name: e.target.value });
            }}
          />
          <input
            className="block"
            placeholder="Description"
            value={recipe.description ?? ""}
            onChange={(e) => {
              recipeDispatch({
                type: "updateDescription",
                description: e.target.value,
              });
            }}
          />
          <div>Ingredients:</div>
          {recipe.ingredients?.map((ingredient) => (
            <div key={ingredient.id} className="text-sm">
              <input
                placeholder="Ingredient"
                value={ingredient.name}
                onChange={(e) => {
                  recipeDispatch({
                    type: "updateIngredient",
                    ingredient: { ...ingredient, name: e.target.value },
                  });
                }}
              />
              :{" "}
              <input
                placeholder="amt"
                type="number"
                value={ingredient.quantity.amount}
                onChange={(e) => {
                  recipeDispatch({
                    type: "updateIngredient",
                    ingredient: {
                      ...ingredient,
                      quantity: {
                        ...ingredient.quantity,
                        amount: parseFloat(e.target.value),
                      },
                    },
                  });
                }}
              />
              <input
                placeholder="unit"
                value={ingredient.quantity.unit}
                onChange={(e) => {
                  recipeDispatch({
                    type: "updateIngredient",
                    ingredient: {
                      ...ingredient,
                      quantity: {
                        ...ingredient.quantity,
                        unit: e.target.value,
                      },
                    },
                  });
                }}
              />
            </div>
          ))}
          <div className="grid justify-items-center">
            <button
              onClick={() => recipeDispatch({ type: "addIngredient" })}
              className="border-2 rounded-lg "
            >
              <PlusIcon className="size-5" />
            </button>
          </div>
          <div>Procedure:</div>
          <ol className="list-inside list-decimal">
            {recipe.steps?.map((step) => (
              <li key={step.id} className="text-sm">
                <input
                  placeholder="Step"
                  value={step.description}
                  onChange={(e) => {
                    recipeDispatch({
                      type: "updateStep",
                      step: { ...step, description: e.target.value },
                    });
                  }}
                />
              </li>
            ))}
          </ol>
          <div className="grid justify-items-center">
            <button
              onClick={() => recipeDispatch({ type: "addStep" })}
              className="border-2 rounded-lg "
            >
              <PlusIcon className="size-5" />
            </button>
          </div>
          <div className="grid justify-items-end">
            <button
              className="bg-gray-800 text-white rounded px-2 py-1 text-sm w-fit"
              type="submit"
              onClick={() => {
                addRecipe({ variables: { recipe: toRecipeInput(recipe) } });
                setIsAddingRecipe(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <button
        className="justify-items-center border-2 rounded-lg "
        onClick={() => {
          setIsAddingRecipe(true);
        }}
      >
        <PlusIcon className="size-8" />
      </button>
    </Wrapper>
  );
}

const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="mx-auto w-fit py-6">{children}</div>;
};

type RecipeAction =
  | {
      type: "updateName";
      name: string;
    }
  | {
      type: "updateDescription";
      description: string;
    }
  | { type: "addIngredient" }
  | { type: "addStep" }
  | {
      type: "updateIngredient";
      ingredient: RecipeIngredientInput;
    }
  | {
      type: "updateStep";
      step: Step;
    };

const recipeReducer: React.Reducer<RecipeFormInput, RecipeAction> = (
  state,
  action,
): RecipeFormInput => {
  switch (action.type) {
    case "updateName": {
      return { ...state, name: action.name };
    }
    case "updateDescription": {
      return { ...state, description: action.description };
    }
    case "addIngredient": {
      if (state.ingredients === undefined) {
        return {
          ...state,
          ingredients: [{ id: 0, name: "", quantity: { unit: "", amount: 0 } }],
        };
      }

      let highestID = 0;
      for (let i = 0; i < state.ingredients.length; i++) {
        if (state.ingredients[i].id > highestID) {
          highestID = state.ingredients[i].id;
        }
      }

      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          {
            id: highestID + 1,
            name: "",
            quantity: {
              unit: "",
              amount: 0,
            },
          },
        ],
      };
    }
    case "addStep": {
      if (state.steps === undefined) {
        return {
          ...state,
          steps: [{ id: 0, description: "" }],
        };
      }

      let highestID = 0;
      for (let i = 0; i < state.steps.length; i++) {
        if (state.steps[i].id > highestID) {
          highestID = state.steps[i].id;
        }
      }

      return {
        ...state,
        steps: [
          ...state.steps,
          {
            id: highestID + 1,
            description: "",
          },
        ],
      };
    }
    case "updateIngredient": {
      if (state.ingredients === undefined) {
        return state;
      }

      // find our element
      let idx = -1;
      for (let i = 0; i < state.ingredients.length; i++) {
        if (state.ingredients[i].id === action.ingredient.id) {
          idx = i;
        }
      }

      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, idx),
          action.ingredient,
          ...state.ingredients.slice(idx + 1),
        ],
      };
    }
    case "updateStep": {
      if (state.steps === undefined) {
        return state;
      }

      // find our element
      let idx = -1;
      for (let i = 0; i < state.steps.length; i++) {
        if (state.steps[i].id === action.step.id) {
          idx = i;
        }
      }

      return {
        ...state,
        steps: [
          ...state.steps.slice(0, idx),
          action.step,
          ...state.steps.slice(idx + 1),
        ],
      };
    }
  }
};

type RecipeFormInput = {
  name: string;
  description?: string;
  ingredients?: Array<RecipeIngredientInput>;
  steps?: Array<Step>;
};

type RecipeIngredientInput = {
  id: number;
} & IngredientInput;

function toRecipeInput(recipeFormInput: RecipeFormInput): RecipeInput {
  const { name, description, ingredients, steps } = recipeFormInput;
  const recipe: RecipeInput = {
    name,
    description: description && description != undefined ? description : "",
    ingredients,
    steps: [],
  };
  if (ingredients) {
    recipe.ingredients = [];
    for (let i = 0; i < ingredients.length; i++) {
      recipe.ingredients.push({
        name: ingredients[i].name,
        quantity: {
          amount: ingredients[i].quantity.amount,
          unit: ingredients[i].quantity.unit,
        },
      });
    }
  }
  if (steps) {
    recipe.steps = [];
    for (let i = 0; i < steps.length; i++) {
      recipe.steps.push({
        description: steps[i].description,
      });
    }
  }
  console.log(recipe);
  return recipe;
}
