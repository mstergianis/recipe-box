import { gql } from "@/graphql";
import type { Recipe } from "@/graphql/graphql";
import { getClient } from "@/app/ApolloClient";
import { RecipeCard } from "./ui/RecipeCard/RecipeCard";
import NewRecipeButton from "./ui/NewRecipeButton/NewRecipeButton";

const GET_RECIPES = gql(`
    query Recipe {
      recipes {
        id
        description
        name
        ingredients {
          id
          name
          quantity { id amount unit }
        }
        steps {
          id
          description
        }
      }
    }
  `);

export default async function Home() {
  const client = getClient();
  const { loading, error, data } = await client.query({
    query: GET_RECIPES,
  });
  if (loading) return "loading";

  if (error) return "Error";

  return (
    <>
      <div>
        {data.recipes?.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <NewRecipeButton />
    </>
  );
}
