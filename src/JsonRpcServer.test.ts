import { describe, it, expect, beforeEach } from "vitest";
import { JsonRpcServer } from "./JsonRpcServer";

describe("JsonRpcServer", () => {
  let server: JsonRpcServer;

  beforeEach(() => {
    server = new JsonRpcServer();
  });

  it("should start the server successfully", async () => {
    await expect(server.start()).resolves.not.toThrow();
  });

  it("should throw error when starting server twice", async () => {
    await server.start();
    await expect(server.start()).rejects.toThrow("Server is already running");
  });

  it("should stop the server successfully", async () => {
    await server.start();
    await expect(server.stop()).resolves.not.toThrow();
  });

  it("should throw error when stopping server that is not running", async () => {
    await expect(server.stop()).rejects.toThrow("Server is not running");
  });

  it("should allow start after stop", async () => {
    await server.start();
    await server.stop();
    await expect(server.start()).resolves.not.toThrow();
  });
});
