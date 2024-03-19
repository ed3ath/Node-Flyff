import { PacketType } from "../common/packetType";
import { ServerType } from "../common/serverType";
import { TcpServer } from "../libraries/tcpServer";
import { HandlerConstructor } from "../libraries/packetHandler";
import { Logger } from "../helpers/logger";
import { BuilderType } from "../common/builderType";

export interface IServerConfig {
  host: string;
  port: number;
  buildVersion?: string;
  accountVerification?: boolean;
  passwordEncryptionKey?: string;
  maxConnection: number;
  clientBufferSize: number;
}

export class ServerBuilder {
  private logger: Logger;
  private server: TcpServer;
  private options: IServerConfig;
  private handlers: Map<PacketType, HandlerConstructor>;
  serverType: ServerType;

  constructor() {}

  setServerType(type: ServerType) {
    this.logger = new Logger(BuilderType.SERVER_BUILDER);
    this.serverType = type;
  }

  addServer(options: IServerConfig) {
    this.options = options;
  }

  addHandlers(handlers: Map<PacketType, HandlerConstructor>) {
    this.handlers = handlers;
  }

  build() {
    if (!this.serverType || !this.options || !this.addHandlers) return
    this.server = new TcpServer(this.serverType, this.options, this.handlers);
    this.server.create()
  }

  getServer() {
    return this.server;
  }
}
