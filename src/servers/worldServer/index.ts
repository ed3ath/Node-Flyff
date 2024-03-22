import { join } from "path";
import _ from "lodash";
import cron from "node-cron";

import { InstanceBuilder } from "../../builders/instanceBuilder";
import { ConfigBuilder } from "../../builders/configBuilder";
import { DatabaseBuilder } from "../../builders/databaseBuilder";
import { HandlerBuilder } from "../../builders/handlerBuilder";
import { ServerBuilder } from "../../builders/serverBuilder";
import { ServerType } from "../../common/serverType";
import { WorldServer } from "./worldServer";
import { IChannel, ICluster } from "../../interfaces/cluster";
import { IInstance } from "../../interfaces/instance";
import { MessageCommand, RedisChannel } from "../../common/redisTypes";
import {
  buildEncryptionKeyFromString,
  decryptString,
  encryptString,
  isValidEncryptionString,
  parseMessage,
} from "../../libraries/crypto";
import { RedisBuilder } from "../../builders/redisBuilder";

export default async () => {
  const instanceBuilder = new InstanceBuilder();

  instanceBuilder.buildConfig((builder: ConfigBuilder) => {
    builder.setBasePath(join(__dirname, "../../configs"));
    builder.setConfigFile("world_server.yaml");
  });

  instanceBuilder.buildDatabase((builder: DatabaseBuilder) => {
    builder.setModelsPath(join(__dirname, "../../entities"));
  });

  instanceBuilder.buildHandlers((builder: HandlerBuilder) => {
    builder.setBasePath(__dirname);
  });

  instanceBuilder.buildRedis((builder: RedisBuilder) => {
    builder.setRedisOptions(instanceBuilder?.config?.redis);
  });

  instanceBuilder.buildServer((builder: ServerBuilder) => {
    builder.setServerType(ServerType.WORLD_SERVER);
    builder.addServer(new WorldServer(instanceBuilder.config?.server));
  });
  const instance = await instanceBuilder.build();
  worldIntercom(instance);
};

function worldIntercom(instance: IInstance) {
  const { config, server, publisher, subscriber } = instance;
  const logger = server?.logger;
  const master = buildEncryptionKeyFromString(
    config?.security["master-password"]
  ).toString('hex');

  const channel: IChannel = {
    name: config?.settings.name,
    host: config?.server.host,
    port: config?.server.port,
    enabled: true,
    currentUsers: 0,
    maxUsers: config?.settings["maximum-users"],
    pkEnabled: config?.settings["pk-enabled"],
  };

  const encryptMessage = (message: string, key: string) => {
    return encryptString(message, key);
  };

  const processChannelMessage = (
    redisChannel: RedisChannel,
    message: string
  ) => {
    if (redisChannel !== RedisChannel.CLUSTER_CHANNEL) return;
    if (!isValidEncryptionString(message, master)) return; // reject invalid messages
    const decrypted = parseMessage(decryptString(message, master));
    if (decrypted) {
      if (decrypted.sender === ServerType.WORLD_SERVER) return;
      // console.log(decrypted);
      switch (decrypted.command) {
        case MessageCommand.CLUSTER_ONLINE:
          sendMessage(MessageCommand.ADD_CHANNEL, channel);
          break;

        case MessageCommand.CHANNEL_ADDED:
          // console.log(decrypted.data.name, channel.name);
          if (decrypted.data.name === channel.name) {
            cron.schedule("*/15 * * * * *", () => {
              sendMessage(MessageCommand.PING, channel);
            });
          }
          break;
      }
    }
  };
  const sendMessage = (command: MessageCommand, message: any = null) => {
    publisher?.publish(
      RedisChannel.CLUSTER_CHANNEL,
      encryptMessage(
        typeof message === "object"
          ? JSON.stringify({
              sender: ServerType.WORLD_SERVER,
              command,
              data: message,
            })
          : message,
        master
      )
    );
  };

  subscriber?.subscribe(RedisChannel.CLUSTER_CHANNEL, (err) => {
    if (!err) {
      sendMessage(MessageCommand.ADD_CHANNEL, channel);
    } else {
      logger?.error(err);
    }
  });
  subscriber?.on("message", processChannelMessage.bind(this));

  global.worldServer = {
    channel,
  };
}
