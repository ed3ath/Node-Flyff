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
}
