import { DataSource, ObjectLiteral, Repository } from "typeorm";
import { PacketType } from "../common/packetType";
import { HandlerConstructor } from "../libraries/packetHandler";
import { TcpServer } from "../libraries/tcpServer";
import { IConfig } from "./config";
import { Redis } from "ioredis";
import { IRedisClient } from "./redis";
import { GameResources } from "./resource";

export interface IInstance {
    server: TcpServer | null
    config: IConfig | null
    handlers: Map<PacketType, HandlerConstructor>
    database: DataSource | null
    publisher: Redis | null
    subscriber: Redis | null
    client: IRedisClient | null
    gameResources: GameResources | null
    getEntity(entityName: string): Repository<ObjectLiteral> | undefined
}