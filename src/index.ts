import { JsonRpcServer } from "./JsonRpcServer";
import pino from "pino";
import process from "node:process";

const logger = pino({
  name: "main",
  level: "info",
  timestamp: pino.stdTimeFunctions.isoTime,
});

async function main(): Promise<void> {
  const server = new JsonRpcServer();
  await server.start();
}

main().catch((error) => {
  logger.error({ error }, "Failed to start server");
  process.exit(1);
});
