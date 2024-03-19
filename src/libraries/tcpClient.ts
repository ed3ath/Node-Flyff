import { Database } from "sqlite3";
import { createServer, Server, Socket } from "net";

import { PacketType } from "../common/packetType";
import { ConfigLoader } from "./config";
import { HandlerConstructor } from "./packetHandler";
import { Logger } from "../helpers/logger";
import { ServerTypes } from "../common/serverTypes";

// Interface for server configuration
export interface IClientConfig {
  host: string;
  port: number;
}

export class TcpClient {
  private logger: Logger;
  private client: Socket;
  private serverType: ServerTypes;
  private options: IClientConfig;
  private configLoader: ConfigLoader;
  basePath: string;
  database: Database;

  constructor(basePath: string, serverType: ServerTypes) {
    this.logger =  new Logger(serverType);
    this.basePath = basePath;
    this.serverType = serverType;
  }

  start() {
    this.loadConfig().then(() => {
      this.client = new Socket();
      this.client.connect(
        this.options.port,
        this.options.host,
        this.onConnection.bind(this)
      );
    });
  }

  protected onConnection(): void {
    this.logger.info(
      `Client connected to ${this.options.host}:${this.options.port}`
    );
  }

  // Method to load client configuration
  protected async loadConfig() {
    this.configLoader = new ConfigLoader(this.serverType);
    this.logger.success("Loaded configuration");
    this.options = this.configLoader.getValue("client");
  }
}
