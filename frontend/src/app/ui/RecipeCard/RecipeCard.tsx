import { QueryInner } from "@/app/types";
import type { RecipeQuery } from "@/graphql/graphql";
import { DeleteButton } from "@/app/ui/DeleteButton";

export const RecipeCard: React.FC<{
  recipe: QueryInner<RecipeQuery["recipes"]>;
}> = ({ recipe }) => {
  return (
    <div className="p-4 my-4 border border-gray-200 bg-white rounded-lg shadow-sm">
      <div className="w-full flex justify-between">
        <div className="text-lg">{recipe.name}</div>
        <DeleteButton item={recipe.name} id={recipe.id} />
      </div>
      {recipe.description ?? <div>{recipe.description}</div>}
      <div>Ingredients:</div>
      {recipe.ingredients?.map((ingredient) => (
        <div key={ingredient.id} className="text-sm">
          {ingredient.name}: {ingredient.quantity.amount}
          {ingredient.quantity.unit}
        </div>
      ))}
      <div>Procedure:</div>
      <ol className="list-inside list-decimal">
        {recipe.steps?.map((step) => (
          <li key={step.id} className="text-sm">
            {step.description}
          </li>
        ))}
      </ol>
    </div>
  );
};
