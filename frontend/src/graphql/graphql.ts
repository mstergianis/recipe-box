/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  quantity: Quantity;
};

export type IngredientInput = {
  name: Scalars['String']['input'];
  quantity: QuantityInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  addRecipe: Recipe;
};


export type MutationAddRecipeArgs = {
  recipe?: InputMaybe<RecipeInput>;
};

export type Quantity = {
  __typename?: 'Quantity';
  amount: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  unit: Scalars['String']['output'];
};

export type QuantityInput = {
  amount: Scalars['Float']['input'];
  unit: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  recipes?: Maybe<Array<Recipe>>;
};

export type Recipe = {
  __typename?: 'Recipe';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  ingredients?: Maybe<Array<Ingredient>>;
  name: Scalars['String']['output'];
  steps?: Maybe<Array<Step>>;
};

export type RecipeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  ingredients?: InputMaybe<Array<IngredientInput>>;
  name: Scalars['String']['input'];
  steps?: InputMaybe<Array<StepInput>>;
};

export type Step = {
  __typename?: 'Step';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type StepInput = {
  description: Scalars['String']['input'];
};

export type RecipeQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipeQuery = { __typename?: 'Query', recipes?: Array<{ __typename?: 'Recipe', id: number, description?: string | null, name: string, ingredients?: Array<{ __typename?: 'Ingredient', id: number, name: string, quantity: { __typename?: 'Quantity', id: number, amount: number, unit: string } }> | null, steps?: Array<{ __typename?: 'Step', id: number, description: string }> | null }> | null };

export type AddRecipeMutationVariables = Exact<{
  recipe?: InputMaybe<RecipeInput>;
}>;


export type AddRecipeMutation = { __typename?: 'Mutation', addRecipe: { __typename?: 'Recipe', id: number } };


export const RecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"steps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<RecipeQuery, RecipeQueryVariables>;
export const AddRecipeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddRecipe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipe"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RecipeInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addRecipe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"recipe"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipe"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddRecipeMutation, AddRecipeMutationVariables>;