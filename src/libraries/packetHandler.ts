import { Logger } from "../helpers/logger";
import { FlyffPacket } from "./flyffPacket";
import { TcpServer, UserConnection } from "./tcpServer";

export type HandlerConstructor = new (...args: any) => PacketHandler;

export class PacketHandler {
  logger: Logger;
  userConnection!: UserConnection;
  server!: TcpServer;

  constructor() {
    this.logger = new Logger("Packet Handler");
  }

  async execute(): Promise<void> {}

  send(packet: FlyffPacket) {
    this.userConnection.send(packet);
  }

  async wrappedExecute() {
    try {
      await this.execute();
    } catch (e) {
      console.log(e);
      this.logger.error(e);
      // if (this.userConnection) {
      //   this.userConnection.disconnect();
      // }
    }
  }
}
