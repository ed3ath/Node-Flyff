import {
  IServerConfig,
  TcpServer,
  UserConnection,
} from "../../libraries/tcpServer";
import { ServerType } from "../../common/serverType";
import { FlyffPacket } from "../../libraries/flyffPacket";
import { IUserConnection } from "../../interfaces/connection";
import { ToStringHex } from "../../common/packetType";

// Main TCP Server class
export class ClusterServer extends TcpServer {
  // Constructor to initialize TcpServer instance
  constructor(options: IServerConfig) {
    super(ServerType.CLUSTER_SERVER, options);
  }

  protected onData(data: Buffer, userConnection: IUserConnection) {
    const packet = new FlyffPacket(data, true);
    console.log(data.toString("hex"));
    packet.HeaderNumber = packet.readByte();
    packet.position += 16;
    packet.PacketType = packet.readInt32LE();
    
    const HandlerClass = this.handlers.get(packet.PacketType);
    if (HandlerClass) {
      // Execute the corresponding packet handler
      const handlerInstance = new HandlerClass(packet);
      handlerInstance.userConnection = userConnection;
      handlerInstance.server = this;
      handlerInstance.wrappedExecute();
    } else {
      // Log unimplemented packet type
      this.logger.warn(
        `Unimplemented packet ${this.getPacketTypeId(
          packet.PacketType
        )} (${ToStringHex(packet.PacketType)})`
      );
    }
  }
}
