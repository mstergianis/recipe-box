import { z } from "zod";

export const recipeSchema = z.object({
  name: z.string().trim().min(1, "Name must be at least 1 char"),
  description: z.string().trim().optional(),
  ingredients: z
    .array(
      z.object({
        name: z
          .string()
          .trim()
          .min(1, "You must provide a name for your ingredient."),
        quantity: z.object({
          amount: z.coerce.number(),
          unit: z.string().trim(),
        }),
      }),
    )
    .optional(),
  steps: z
    .array(
      z.object({
        description: z.string().trim(),
      }),
    )
    .optional(),
});
