"use client";
import { IngredientInput, RecipeInput, Step } from "@/graphql/graphql";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useMutation } from "@apollo/client";
import { gql } from "@/graphql";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema } from "./recipeCardSchema";
import { z } from "zod";
import { Input } from "./Input";

const ADD_RECIPE = gql(`
mutation AddRecipe($recipe: RecipeInput) {
  addRecipe(recipe: $recipe) { id }
}
`);

export type EditRecipeCardProps = {
  additionalOnSubmitAction: () => void;
};

export const EditRecipeCard: React.FC<EditRecipeCardProps> = ({
  additionalOnSubmitAction,
}) => {
  const [addRecipe, { loading }] = useMutation(ADD_RECIPE);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.output<typeof recipeSchema>>({
    resolver: zodResolver(recipeSchema),
  });

  const {
    fields: ingredients,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const { fields: steps, append: appendStep } = useFieldArray({
    control,
    name: "steps",
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-2">
      <form
        onSubmit={handleSubmit((data) => {
          addRecipe({ variables: { recipe: data } });
          additionalOnSubmitAction();
          router.refresh();
        })}
      >
        <input
          {...register("name")}
          className="text-lg block"
          placeholder="Recipe Name"
        />
        <input
          {...register("description")}
          className="block"
          placeholder="Description"
        />
        <div>Ingredients:</div>
        {ingredients?.map((ingredient, index) => (
          <div key={ingredient.id} className="text-sm">
            <Input
              {...register(`ingredients.${index}.name`)}
              placeholder="Name"
            />
            <Input
              {...register(`ingredients.${index}.quantity.amount`)}
              type="number"
              placeholder="Quantity Amount"
            />
            <Input
              {...register(`ingredients.${index}.quantity.unit`)}
              placeholder="Quantity Unit"
            />
            <button
              onClick={() => removeIngredient(index)}
              className="border-2 rounded-lg "
            >
              <MinusIcon className="size-5" />
            </button>
            {errors.ingredients?.[index]?.name && (
              <p>{errors.ingredients[index].name.message}</p>
            )}
            {errors.ingredients?.[index]?.quantity?.amount && (
              <p>{errors.ingredients[index].quantity.amount.message}</p>
            )}
            {errors.ingredients?.[index]?.quantity?.unit && (
              <p>{errors.ingredients[index].quantity.unit.message}</p>
            )}
          </div>
        ))}
        <div className="grid justify-items-center">
          <button
            onClick={() =>
              appendIngredient({
                name: "",
                quantity: {
                  amount: 0,
                  unit: "",
                },
              })
            }
            className="border-2 rounded-lg "
          >
            <PlusIcon className="size-5" />
          </button>
        </div>
        <div>Procedure:</div>
        <ol className="list-inside list-decimal">
          {steps?.map((step, index) => (
            <li key={step.id} className="text-sm">
              <input
                className="w-full"
                {...register(`steps.${index}.description`)}
                placeholder="Step"
              />
            </li>
          ))}
        </ol>
        <div className="grid justify-items-center">
          <button
            onClick={() => appendStep({ description: "" })}
            className="border-2 rounded-lg "
          >
            <PlusIcon className="size-5" />
          </button>
        </div>
        <div className="grid justify-items-end">
          <button
            className={`text-white rounded px-2 py-1 text-sm w-fit ${
              loading
                ? "bg-gray-400 opacity-50 cursor-not-allowed"
                : "bg-gray-800"
            }`}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
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

export function toRecipeInput(recipeFormInput: RecipeFormInput): RecipeInput {
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
