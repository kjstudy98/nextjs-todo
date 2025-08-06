import * as z from "zod";

export const TodoInputSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "空白はNGです"),
  status: z.boolean(),
});

export const TodoTitleOnlySchema = TodoInputSchema.pick({ title: true });
