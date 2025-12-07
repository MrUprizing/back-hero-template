import { z } from "@hono/zod-openapi";

// Example
export const exampleParamSchema = z.object({
	id: z
		.string()
		.min(1)
		.openapi({
			param: {
				name: "id",
				in: "path",
			},
			example: "123",
		}),
});

export const exampleResponseSchema = z
	.object({
		id: z.string().openapi({
			example: "123",
		}),
		name: z.string().openapi({
			example: "Example Name",
		}),
		value: z.string().openapi({
			example: "example value",
		}),
	})
	.openapi("Example");
