import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import fastify from "fastify";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const PingResponse = z.object({
  message: z.string(),
});

const main = async (): Promise<void> => {
  const server = fastify();

  await server.register(fastifySwagger);
  await server.register(fastifySwaggerUi);

  server.get(
    "/ping",
    {
      schema: {
        response: {
          200: zodToJsonSchema(PingResponse),
        },
      },
    },
    async (request, reply) => {
      return { message: "pong" };
    },
  );

  server.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
};

main();
