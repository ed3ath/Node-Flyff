import { RedisOptions } from "ioredis";
import { IChannel, ICluster } from "./cluster";

export interface IRedisClient {
  getAllClusters(): Promise<ICluster[]>;
  insertCluster(cluster: ICluster): Promise<void>;
  updateCluster(cluster: ICluster): Promise<void>;
  deleteCluster(clusterName: string): Promise<void>;
  getCluster(clusterName: string): Promise<ICluster | null>;
  getAllChannels(clusterName: string): Promise<IChannel[]>;
  insertChannel(clusterName: string, channel: IChannel): Promise<void>;
  updateChannel(clusterName: string, updatedChannel: IChannel): Promise<void>;
  getChannel(
    clusterName: string,
    channelName: string
  ): Promise<IChannel | null>;
  deleteChannel(clusterName: string, channelName: string): Promise<void>;
  getChannelById(
    clusterName: string,
    id: number
  ): Promise<IChannel | undefined>;
  getNumpadId(username: string): Promise<number | null>
  setNumpadId(username: string, numPadId: number): Promise<void>
  setCharacterSession(sessionKey: number, characterId: number, username: string, password: string, expireInSeconds: number): Promise<void>
  getCharacterSession(sessionKey: number): Promise<{characterId: number, username: string, password: string} | null>
  deleteCharacterSession(sessionKey: number): Promise<void>
  setUserAuthState(username: string, authState: {authenticated: boolean, authKey: number, timestamp: number, sessionId: number}): Promise<void>
  getUserAuthState(username: string): Promise<{authenticated: boolean, authKey: number, timestamp: number, sessionId: number} | null>
}
