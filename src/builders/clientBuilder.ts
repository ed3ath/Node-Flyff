import { PacketType } from "../common/packetType";
import { ServerType } from "../common/serverType";
import { HandlerConstructor } from "../libraries/packetHandler";
import { Logger } from "../helpers/logger";
import { BuilderType } from "../common/builderType";
import { TcpClient } from "../libraries/tcpClient";
import { SocketConstructorOpts } from "net";

export interface IServerConfig {
  host: string;
  port: number;
  buildVersion?: string;
  accountVerification?: boolean;
  passwordEncryptionKey?: string;
  maxConnection: number;
  clientBufferSize: number;
}

export class ClientBuilder {
  private logger: Logger;
  private socket: TcpClient;
  private options: SocketConstructorOpts;
  private handlers: Map<PacketType, HandlerConstructor>;
  serverType: ServerType;

  constructor() {}

  setServerType(type: ServerType) {
    this.logger = new Logger(BuilderType.CLIENT_BUILDER);
    this.serverType = type;
  }

  addClient(options: SocketConstructorOpts) {
    this.options = options;
  }

  addHandlers(handlers: Map<PacketType, HandlerConstructor>) {
    this.handlers = handlers;
  }

  build() {
    if (!this.serverType || !this.options || !this.addHandlers) return
   this.socket = new TcpClient(this.options, this.serverType) 
  }

  getSocket() {
    return this.socket;
  }
}
