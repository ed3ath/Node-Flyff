import { join } from "path";
import _ from "lodash";
import cron from "node-cron";

import { InstanceBuilder } from "../../builders/instanceBuilder";
import { ConfigBuilder } from "../../builders/configBuilder";
import { DatabaseBuilder } from "../../builders/databaseBuilder";
import { HandlerBuilder } from "../../builders/handlerBuilder";
import { ServerBuilder } from "../../builders/serverBuilder";
import { ServerType } from "../../common/serverType";
import { ClusterServer } from "./clusterServer";
import { RedisChannel, MessageCommand } from "../../common/redisTypes";
import { IChannel, ICluster } from "../../interfaces/cluster";
import { IInstance } from "../../interfaces/instance";
import {
  buildEncryptionKeyFromString,
  encryptString,
  isValidEncryptionString,
  parseMessage,
  decryptString,
  encryptMessage,
} from "../../libraries/crypto";
import { RedisBuilder } from "../../builders/redisBuilder";

export default async () => {
  const instanceBuilder = new InstanceBuilder();

  instanceBuilder.buildConfig((builder: ConfigBuilder) => {
    builder.setBasePath(join(__dirname, "../../configs"));
    builder.setConfigFile("cluster_server.yaml");
  });

  instanceBuilder.buildDatabase(async (builder: DatabaseBuilder) => {
    builder.setModelsPath(join(__dirname, "../../entities"));
  });

  instanceBuilder.buildHandlers(async (builder: HandlerBuilder) => {
    builder.setBasePath(__dirname);
  });

  instanceBuilder.buildRedis((builder: RedisBuilder) => {
    builder.setRedisOptions(instanceBuilder?.config?.redis);
  });

  instanceBuilder.buildServer((builder: ServerBuilder) => {
    builder.setServerType(ServerType.CLUSTER_SERVER);
    builder.addServer(new ClusterServer(instanceBuilder.config?.server));
  });
  const instance = await instanceBuilder.build();
  clusterIntercom(instance);
};

async function clusterIntercom(instance: IInstance) {
  const { config, server, publisher, subscriber, client } = instance;
  const logger = server?.logger;
  const master = buildEncryptionKeyFromString(
    config?.security["master-password"]
  ).toString("hex");
  const redisChannels = [
    RedisChannel.CORE_CHANNEL,
    RedisChannel.CLUSTER_CHANNEL,
  ];

  const initCluster: ICluster = {
    name: config?.settings.name,
    host: config?.server.host,
    port: config?.server.port,
    enabled: true,
    channels: [],
  };
  const clusterKey = `cluster:${initCluster.name}`;

  ////// MAIN //////////
  subscriber?.subscribe(...redisChannels, (err) => {
    if (!err) {
      sendMessage(
        RedisChannel.CORE_CHANNEL,
        MessageCommand.ADD_CLUSTER,
        initCluster
      );
      sendMessage(RedisChannel.CLUSTER_CHANNEL, MessageCommand.CLUSTER_ONLINE);
    } else {
      logger?.error(err);
    }
  });
  subscriber?.on("message", processChannelMessage.bind(this));

  cron.schedule("*/30 * * * * *", async () => {
    const channels = await client?.getAllChannels(initCluster.name);
    channels?.forEach(async (channel) => {
      if (
        channel.lastPing &&
        new Date().getTime() > channel.lastPing + 60 * 1000
      ) {
        await client?.deleteChannel(initCluster.name, channel.name);
        sendMessage(
          RedisChannel.CLUSTER_CHANNEL,
          MessageCommand.CLUSTER_REMOVED,
          channel
        );
        logger?.info(
          "World Channel",
          channel.name,
          "has been removed. Reason: Timeout"
        );
      }
    });
  });
  // ////// MAIN //////////

  async function processChannelMessage(
    redisChannel: RedisChannel,
    message: string
  ) {
    if (!redisChannels.includes(redisChannel)) return;
    if (!isValidEncryptionString(message, master)) return; // reject invalid messages
    const decrypted = parseMessage(decryptString(message, master));
    if (decrypted) {
      if (decrypted.sender === ServerType.CLUSTER_SERVER) return;
      // console.log(decrypted);

      if (redisChannel === RedisChannel.CORE_CHANNEL) {
        switch (decrypted.command) {
          case MessageCommand.CORE_ONLINE:
            sendMessage(
              RedisChannel.CORE_CHANNEL,
              MessageCommand.ADD_CLUSTER,
              initCluster
            );
            break;

          case MessageCommand.CLUSTER_ADDED:
            if (decrypted.data?.name === initCluster.name) {
              cron.schedule("*/15 * * * * *", () => {
                sendMessage(RedisChannel.CORE_CHANNEL, MessageCommand.PING, {
                  name: initCluster.name,
                });
              });
            }
            break;

          case MessageCommand.CHANNEL_REMOVED:
            if (decrypted.data?.name === initCluster.name) {
              sendMessage(
                RedisChannel.CORE_CHANNEL,
                MessageCommand.ADD_CLUSTER,
                initCluster
              );
            }
            break;
        }
      }

      if (redisChannel === RedisChannel.CLUSTER_CHANNEL) {
        switch (decrypted.command) {
          case MessageCommand.ADD_CHANNEL: {
            if (
              await client?.getChannelById(initCluster.name, decrypted.data.id)
            ) {
              logger?.warn("A channel with id", decrypted.data.id, "already exist.");
              sendMessage(RedisChannel.CLUSTER_CHANNEL, MessageCommand.CHANNEL_ID_EXIST, decrypted.data);
            } else if (await client?.getChannel(initCluster.name, decrypted.data.name)) {
              logger?.warn(decrypted.data.name, "already exist.");
              sendMessage(RedisChannel.CLUSTER_CHANNEL, MessageCommand.CHANNEL_EXIST, decrypted.data);
            } else {
              const channel: IChannel = {
                ...decrypted.data,
                lastPing: new Date().getTime(),
              };
              await client?.insertChannel(initCluster.name, channel);
              sendMessage(
                RedisChannel.CLUSTER_CHANNEL,
                MessageCommand.CHANNEL_ADDED,
                channel
              );
            }
            break;
          }
          case MessageCommand.PING: {
            const channel: IChannel | null | undefined =
              await client?.getChannel(initCluster.name, decrypted.data.name);
            if (channel) {
              const updated: IChannel = {
                ...channel,
                lastPing: new Date().getTime(),
              };
              await client?.updateChannel(initCluster.name, updated);
            }
            break;
          }
        }
      }
    }
  }
  function sendMessage(
    channel: RedisChannel,
    command: MessageCommand,
    message: any = null
  ) {
    publisher?.publish(
      channel,
      encryptMessage(
        typeof message === "object"
          ? JSON.stringify({
              sender: ServerType.CLUSTER_SERVER,
              command,
              data: message,
            })
          : message,
        master
      )
    );
  }
}
