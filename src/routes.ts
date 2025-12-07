import { createRoute } from "@hono/zod-openapi";
import { exampleParamSchema, exampleResponseSchema } from "./schemas";

const getExampleHandler = (id: string) => ({
	id,
	name: "Example Data",
	value: 42,
});

export const routes = [
	{
		definition: createRoute({
			method: "get",
			path: "/example/{id}",
			request: { params: exampleParamSchema },
			responses: {
				200: {
					content: {
						"application/json": { schema: exampleResponseSchema },
					},
					description: "Retrieve example data",
				},
			},
		}),
		handler: (c: any) => {
			const { id } = c.req.valid("param");
			return c.json(getExampleHandler(id));
		},
	},
];
