import 'reflect-metadata';
import { createServer, Server, Socket } from "net";
import * as fs from "fs-extra";
import * as path from "path";

import { FlyffPacket } from "./flyffPacket";
import { HandlerConstructor } from "./packetHandler";
import { PacketType } from "../common/packetType";
import { cwd } from "process";
import { Logger } from "../helpers/logger";

export interface TcpServerOptions {
  port: number;
  host?: string;
  maxConnection?: number;
  clientBufferSize?: number;
  handlersPath?: string;
}

export class TcpServer {
  readonly options: TcpServerOptions;
  private server!: Server;
  private connections: Map<number, UserConnection> = new Map();
  private handlers: Map<PacketType, HandlerConstructor> = new Map();

  constructor(options: TcpServerOptions) {
    this.options = {
      ...options,
      host: options.host ?? "127.0.0.1",
      maxConnection: options.maxConnection ?? 1000,
      clientBufferSize: options.clientBufferSize ?? 128,
      handlersPath: options.handlersPath ?? cwd(),
    };
  }

  start() {
    this.loadHandlers()
      .then(() => {
        this.server = createServer(this.onConnection.bind(this));
        this.server.listen(
          this.options.port,
          this.options.host,
          this.onServerStart.bind(this)
        );
      })
      .catch(this.onError.bind(this));
  }

  async loadHandlers() {
    if (!this.options.handlersPath) {
      throw new Error(`Cannot find path ${this.options.handlersPath}`);
    }
    const handlersFolder = path.join(this.options.handlersPath, "handlers");
    const files = fs.readdirSync(handlersFolder);
    if (files.length) {
      await Promise.all(
        files.map(async (file) => {
          const handlerModule = await import(path.join(handlersFolder, file));
          if (handlerModule && handlerModule.default) {
            const HandlerClass = handlerModule.default as HandlerConstructor;
            const decoratedKey = Reflect.getMetadata(
              "packetType",
              HandlerClass
            );
            if (decoratedKey) {
              // this.handlers.set(decoratedKey, HandlerClass);
            }
          }
        })
      );
    }
  }

  protected onServerStart(): void {
    Logger.info(
      `Server listening on ${this.options.host}:${this.options.port}`
    );
  }

  protected onConnection(socket: Socket): void {
    const userConnection = new UserConnection(socket);
    this.connections.set(userConnection.sessionId, userConnection);
    console.log(
      `New connection established with session ID: ${userConnection.sessionId} (${socket.remoteAddress}:${socket.remotePort})`
    );

    const packet = FlyffPacket.createEmpty();
    packet.writeUInt32LE(PacketType.WELCOME);
    packet.writeUInt32LE(userConnection.sessionId);
    userConnection.send(FlyffPacket.appendHeader(packet.buffer));

    socket.on("data", this.onData.bind(this));
    socket.on("close", this.onDisconnect.bind(this));
    socket.on("error", (error) =>
      this.onError(error, userConnection.sessionId)
    );
  }

  protected onData(data: Buffer): void {
    const packet = new FlyffPacket(data);
    const HandlerClass = this.handlers.get(packet.PacketType);
    if (HandlerClass) {
      const handlerInstance = new HandlerClass(packet);
      handlerInstance.execute();
    } else {
      Logger.warn(`Unimplemented packet ${this.getPacketTypeId(packet.PacketType)} ${packet.PacketType.toString(16)}`)
    }
  }

  protected onDisconnect(sessionId: number): void {
    if (sessionId in this.connections) {
      this.connections.delete(sessionId);
      console.log(`Connection with session ID ${sessionId} closed`);
    }
  }

  protected onError(error: Error, sessionId: number | null = null): void {
    if (sessionId) {
      console.log(`Error occurred for session ID ${sessionId}: ${error}`);
    } else {
      console.log(error);
    }
  }

  private getPacketTypeId(value: number): string | undefined {
    for (const key in PacketType) {
      if (PacketType[key as keyof typeof PacketType] === value) {
        return key;
      }
    }
    return undefined;
  }
}

export class UserConnection {
  public readonly sessionId: number;
  public readonly socket: Socket;

  constructor(socket: Socket) {
    this.sessionId = Math.floor(Math.random() * Math.pow(2, 32));
    this.socket = socket;
  }

  protected onData(_packet: FlyffPacket): void {}

  send(packet: Buffer) {
    this.socket.write(packet);
  }
}
