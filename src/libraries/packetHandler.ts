import { PacketType } from "../common/packetType";
import { Logger } from "../helpers/logger";
import { FlyffPacket } from "./flyffPacket";
import { TcpServer } from "./tcpServer";
import { IUserConnection } from "./connection";

export type HandlerConstructor = new (...args: any) => PacketHandler;

export function SetPacketType(key: PacketType): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata("packetType", key, target);
  };
}

export class PacketHandler {
  logger: Logger;
  userConnection: IUserConnection;
  server: TcpServer;

  constructor() {
    this.logger = new Logger("Packet Handler");
  }

  async execute(): Promise<void> {}

  send(packet: FlyffPacket) {
    this.userConnection.send(packet);
  }

  wrappedExecute = async () => {
    try {
      await this.execute()
    } catch (e) {
      this.logger.error(e);
    }
  };
}
