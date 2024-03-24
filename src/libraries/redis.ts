import { Redis, RedisOptions } from "ioredis";
import _ from "lodash";

import { ICluster, IChannel } from "../interfaces/cluster";
import { IRedisClient } from "../interfaces/redis";
import { Logger } from "../helpers/logger";

export class RedisClient implements IRedisClient {
  private logger: Logger;
  private client: Redis;

  constructor(options: RedisOptions) {
    this.logger = new Logger("Redis Client");
    this.client = new Redis(options);
  }

  async getAllClusters(): Promise<ICluster[]> {
    const clusterKeys = await this.client.keys("cluster:*");
    const clusters: ICluster[] = [];
    if (clusterKeys) {
      for (const key of clusterKeys) {
        const clusterData = await this.getCluster(key);
        if (clusterData) {
          clusters.push(clusterData);
        }
      }
    }
    return clusters;
  }

  async insertCluster(cluster: ICluster): Promise<void> {
    const key = `cluster:${cluster.name}`;
    const clusterData = {
      name: cluster.name,
      host: cluster.host,
      port: cluster.port,
      lastPing: cluster.lastPing || 0,
      channels: JSON.stringify(cluster.channels),
      enabled: cluster.enabled ? "true" : "false",
    };
    await this.client.hmset(key, clusterData);
  }

  async updateCluster(cluster: ICluster): Promise<void> {
    const key = `cluster:${cluster.name}`;
    const clusterData = {
      name: cluster.name,
      host: cluster.host,
      port: cluster.port,
      lastPing: cluster.lastPing || 0,
      channels: JSON.stringify(cluster.channels),
      enabled: cluster.enabled ? "true" : "false",
    };

    await this.client.hmset(key, clusterData);
  }

  async deleteCluster(clusterName: string): Promise<void> {
    await this.client.del(`cluster:${clusterName}`);
  }

  async getCluster(clusterName: string): Promise<ICluster | null> {
    const cluster: any = await this.client.hgetall(
      clusterName?.includes("cluster:") ? clusterName : `cluster:${clusterName}`
    );
    let channels: IChannel[] = [];
    if (cluster.channels) {
      const channelDataArray = JSON.parse(cluster.channels);
      channels = _.map(
        channelDataArray,
        (channelData: IChannel) => ({
          id: channelData.id,
          name: channelData.name,
          host: channelData.host,
          port: channelData.port,
          maxUsers: channelData.maxUsers,
          currentUsers: channelData.currentUsers,
          enabled: channelData.enabled,
          pkEnabled: channelData.pkEnabled,
        })
      );
    }

    if (!_.isNil(cluster) && !_.isEmpty(cluster)) {
      return {
        name: cluster.name,
        host: cluster.host,
        port: parseInt(cluster.port),
        lastPing: parseInt(cluster.lastPing),
        channels,
        enabled: cluster.enabled === "true",
      };
    }
    return null;
  }

  async getAllChannels(clusterName: string): Promise<IChannel[]> {
    const cluster = await this.getCluster(clusterName);
    return cluster?.channels || [];
  }

  async insertChannel(clusterName: string, channel: IChannel): Promise<void> {
    const clusterData = await this.getCluster(clusterName);
    const clusterKey = `cluster:${clusterName}`;

    if (clusterData) {
      if (_.some(clusterData.channels, (i) => i.name === channel.name)) return;
      const channelData = {
        id: channel.id,
        name: channel.name,
        host: channel.host,
        port: channel.port,
        maxUsers: channel.maxUsers,
        currentUsers: channel.currentUsers,
        enabled: channel.enabled,
        lastPing: channel.lastPing || 0,
        pkEnabled: channel.pkEnabled,
      };
      clusterData.channels.push(channelData);
      await this.client.hmset(clusterKey, {
        ...clusterData,
        channels:
          typeof clusterData.channels === "object"
            ? JSON.stringify(clusterData.channels)
            : clusterData.channels,
      });
    }
  }

  async updateChannel(
    clusterName: string,
    updatedChannel: IChannel
  ): Promise<void> {
    const clusterData = await this.getCluster(clusterName);
    const clusterKey = `cluster:${clusterName}`;

    if (clusterData) {
      const existIndex = _.findIndex(clusterData.channels, {
        name: updatedChannel.name,
      });
      if (existIndex >= 0) {
        clusterData.channels[existIndex] = {
          ...clusterData.channels[existIndex],
          ...updatedChannel,
        };
      } else {
        clusterData.channels.push(updatedChannel);
      }
      await this.client.hmset(clusterKey, {
        ...clusterData,
        channels:
          typeof clusterData.channels === "object"
            ? JSON.stringify(clusterData.channels)
            : clusterData.channels,
      });
    }
  }

  async getChannel(
    clusterName: string,
    channelName: string
  ): Promise<IChannel | null> {
    const cluster = await this.getCluster(clusterName);
    return _.find(cluster?.channels, { name: channelName }) || null;
  }

  async deleteChannel(clusterName: string, channelName: string): Promise<void> {
    const key = `cluster:${clusterName}`;
    const clusterData = await this.client.hgetall(key);

    if (clusterData) {
      let channels: IChannel[] = [];
      try {
        channels = JSON.parse(clusterData.channels);
      } catch (error) {
        this.logger.error("Error parsing channels JSON:", error);
      }

      const updatedChannels = _.filter(channels, { name: channelName });
      clusterData.channels = JSON.stringify(updatedChannels);

      await this.client.hmset(key, clusterData);
    } else {
      this.logger.error("Cluster not found:", clusterName);
    }
  }

  async getChannelById(clusterName: string, id: number): Promise<IChannel | undefined> {
    const channels = await this.getAllChannels(clusterName);
    return _.find(channels, { id });
  }
}
