# API Template

## Add Endpoint

### 1. Add schemas in `schemas.ts`
```typescript
export const todoParamSchema = z.object({
	id: z.string().openapi({
		param: { name: "id", in: "path" },
		example: "123",
	}),
});

export const todoResponseSchema = z
	.object({
		id: z.string().openapi({ example: "123" }),
		title: z.string().openapi({ example: "Buy milk" }),
	})
	.openapi("Todo");
```

### 2. Add route in `routes.ts`
```typescript
{
	definition: createRoute({
		method: "get",
		path: "/todos/{id}",
		request: { params: todoParamSchema },
		responses: {
			200: {
				content: {
					"application/json": { schema: todoResponseSchema },
				},
				description: "Retrieve todo",
			},
		},
	}),
	handler: (c: any) => {
		const { id } = c.req.valid("param");
		return c.json({ id, title: "Buy milk" });
	},
}
```

### 3. Add to `routes` array
```typescript
export const routes = [..., { /* new route */ }];
```

## Deploy
```bash
npm run build
```

## Docs
- `/doc` - OpenAPI JSON
- `/scalar` - UI
