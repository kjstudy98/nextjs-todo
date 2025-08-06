import * as z from "zod";
import { TodoInputSchema } from "@/validation/schema";

export type Todo = z.infer<typeof TodoInputSchema>;
