import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { handle } from "hono/aws-lambda";
import { logger } from "hono/logger";
import { routes } from "./routes";
import { serve } from "@hono/node-server";

const app = new OpenAPIHono();

app.use(logger());

routes.forEach(({ definition, handler }) => {
	app.openapi(definition, handler);
});

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "My API",
	},
});

app.get("/", Scalar({ url: "/doc", theme: "deepSpace" }));

app.get("/scalar", Scalar({ url: "/doc", theme: "deepSpace" }));

serve({
	fetch: app.fetch,
	port: 3000,
});
export const handler = handle(app);
