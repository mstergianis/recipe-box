"use client";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { EditRecipeCard } from "../EditRecipeCard/EditRecipeCard";

export default function NewRecipeButton() {
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);
  if (isAddingRecipe) {
    return (
      <EditRecipeCard
        additionalOnSubmitAction={() => {
          setIsAddingRecipe(() => false);
        }}
      />
    );
  }

  return (
    <Wrapper>
      <button
        className="justify-items-center border-2 rounded-lg hover:bg-slate-100 hover:ease-in-out transition duration-200 hover:text-gray-700"
        onClick={() => {
          setIsAddingRecipe(true);
        }}
      >
        <PlusIcon className="size-8" />
      </button>
    </Wrapper>
  );
}

const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className="mx-auto w-fit py-6">{children}</div>;
};
