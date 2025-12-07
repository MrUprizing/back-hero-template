# API Template

## Estructura del Proyecto

```
TEMPLATE/
├── src/
│   ├── index.ts          # Punto de entrada de la aplicación
│   ├── routes.ts         # Definición de rutas y handlers
│   └── schemas.ts        # Esquemas de validación (Zod)
├── dist/                 # Archivos compilados (generados)
├── package.json          # Dependencias y scripts
├── tsconfig.json         # Configuración de TypeScript
├── bun.lock              # Lock file de dependencias
└── README.md             # Este archivo
```

### Descripción de Archivos

- **index.ts**: Inicia el servidor Hono y registra las rutas
- **routes.ts**: Contiene la definición de endpoints con OpenAPI
- **schemas.ts**: Define los esquemas Zod para validación de requests/responses

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
