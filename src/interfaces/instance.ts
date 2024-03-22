import { DataSource } from "typeorm";
import { PacketType } from "../common/packetType";
import { HandlerConstructor } from "../libraries/packetHandler";
import { TcpServer } from "../libraries/tcpServer";
import { IConfig } from "./config";
import { Redis } from "ioredis";
import { IRedisClient } from "./redis";

export interface IInstance {
    server: TcpServer | null
    config: IConfig | null
    handlers: Map<PacketType, HandlerConstructor>
    databases: Map<string, DataSource>
    publisher: Redis | null
    subscriber: Redis | null
    client: IRedisClient | null
    getDatabase(db: string): DataSource | undefined
}