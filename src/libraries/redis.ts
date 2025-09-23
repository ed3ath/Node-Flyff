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
    const key = clusterName?.includes("cluster:") ? clusterName : `cluster:${clusterName}`;
    // this.logger.info(`getCluster called for: ${clusterName}, Redis key: ${key}`);
    const cluster: any = await this.client.hgetall(key);
    // this.logger.info(`Raw cluster data from Redis:`, JSON.stringify(cluster));

    let channels: IChannel[] = [];
    if (cluster.channels) {
      // this.logger.info(`Parsing channels JSON: ${cluster.channels}`);
      const channelDataArray = JSON.parse(cluster.channels);
      // this.logger.info(`Parsed channel data array:`, JSON.stringify(channelDataArray));
      channels = _.map(channelDataArray, (channelData: IChannel) => ({
        id: channelData.id,
        name: channelData.name,
        host: channelData.host,
        port: channelData.port,
        maxUsers: channelData.maxUsers,
        currentUsers: channelData.currentUsers,
        enabled: channelData.enabled,
        lastPing: channelData.lastPing,
        pkEnabled: channelData.pkEnabled,
      }));
      // this.logger.info(`Mapped channels:`, JSON.stringify(channels));
    } else {
      this.logger.warn(`No channels found in cluster data`);
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
    // this.logger.info(`getAllChannels called for cluster: ${clusterName}`);
    const cluster = await this.getCluster(clusterName);
    // this.logger.info(`getCluster returned:`, JSON.stringify(cluster));
    const channels = cluster?.channels || [];
    // this.logger.info(`Returning channels:`, JSON.stringify(channels));
    return channels;
  }

  async insertChannel(clusterName: string, channel: IChannel): Promise<void> {
    // this.logger.info(`insertChannel called: cluster=${clusterName}, channel=${JSON.stringify(channel)}`);
    const clusterData = await this.getCluster(clusterName);
    // this.logger.info(`Cluster data before insert:`, JSON.stringify(clusterData));
    const clusterKey = `cluster:${clusterName}`;

    if (clusterData) {
      if (_.some(clusterData.channels, (i) => i.name === channel.name)) {
        this.logger.warn(`Channel ${channel.name} already exists in cluster ${clusterName}, skipping insert`);
        return;
      }
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
      // this.logger.info(`Updated cluster data with new channel:`, JSON.stringify(clusterData));

      const dataToStore = {
        ...clusterData,
        channels:
          typeof clusterData.channels === "object"
            ? JSON.stringify(clusterData.channels)
            : clusterData.channels,
      };
      // this.logger.info(`Storing to Redis key ${clusterKey}:`, JSON.stringify(dataToStore));

      await this.client.hmset(clusterKey, dataToStore);
      this.logger.info(`Successfully stored channel to Redis`);
    } else {
      this.logger.error(`Cluster ${clusterName} not found, cannot insert channel`);
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

  async getChannelById(
    clusterName: string,
    id: number
  ): Promise<IChannel | undefined> {
    const channels = await this.getAllChannels(clusterName);
    return _.find(channels, { id });
  }

  async getNumpadId(username: string): Promise<number | null> {
    const key = `numpadId:${username}`;
    const numPadId = await this.client.get(key);
    return numPadId !== null ? parseInt(numPadId) : null;
  }

  async setNumpadId(username: string, numPadId: number): Promise<void> {
    const key = `numpadId:${username}`;
    await this.client.set(key, numPadId);
  }

  async setCharacterSession(sessionKey: number, characterId: number, username: string, password: string, expireInSeconds: number): Promise<void> {
    const key = `session:${sessionKey}`;
    const sessionData = {
      characterId: characterId.toString(),
      username,
      password,
    };
    await this.client.hmset(key, sessionData);
    await this.client.expire(key, expireInSeconds);
  }

  async getCharacterSession(sessionKey: number): Promise<{characterId: number, username: string, password: string} | null> {
    const key = `session:${sessionKey}`;
    const sessionData = await this.client.hgetall(key);

    if (_.isEmpty(sessionData)) {
      return null;
    }

    return {
      characterId: parseInt(sessionData.characterId),
      username: sessionData.username,
      password: sessionData.password,
    };
  }

  async deleteCharacterSession(sessionKey: number): Promise<void> {
    const key = `session:${sessionKey}`;
    await this.client.del(key);
  }

  async setUserAuthState(username: string, authState: {authenticated: boolean, authKey: number, timestamp: number, sessionId: number}): Promise<void> {
    const key = `auth:${username}`;
    await this.client.hmset(key, {
      authenticated: authState.authenticated ? 'true' : 'false',
      authKey: authState.authKey.toString(),
      timestamp: authState.timestamp.toString(),
      sessionId: authState.sessionId.toString()
    });
    // Set expiration to 5 minutes
    await this.client.expire(key, 300);
  }

  async getUserAuthState(username: string): Promise<{authenticated: boolean, authKey: number, timestamp: number, sessionId: number} | null> {
    const key = `auth:${username}`;
    const authData = await this.client.hgetall(key);

    if (!authData || Object.keys(authData).length === 0) {
      return null;
    }

    return {
      authenticated: authData.authenticated === 'true',
      authKey: parseInt(authData.authKey, 10),
      timestamp: parseInt(authData.timestamp, 10),
      sessionId: parseInt(authData.sessionId, 10)
    };
  }
}
