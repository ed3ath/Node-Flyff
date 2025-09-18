import path from "path";
import _ from "lodash";
import cron, { ScheduledTask } from "node-cron";

import { InstanceBuilder } from "../../builders/instanceBuilder";
import { ConfigBuilder } from "../../builders/configBuilder";
import { DatabaseBuilder } from "../../builders/databaseBuilder";
import { HandlerBuilder } from "../../builders/handlerBuilder";
import { ServerBuilder } from "../../builders/serverBuilder";
import { ServerType } from "../../types/serverType";
import { WorldServer } from "./worldServer";
import { IChannel, ICluster } from "../../interfaces/cluster";
import { IInstance } from "../../interfaces/instance";
import { MessageCommand, RedisChannel } from "../../types/redisTypes";
import {
  buildEncryptionKeyFromString,
  decryptString,
  encryptMessage,
  isValidEncryptionString,
  parseMessage,
} from "../../libraries/crypto";
import { RedisBuilder } from "../../builders/redisBuilder";
import { FFRandom } from "../../helpers/FFRandom";
import { ResourceBuilder } from "../../builders/resourceBuilder";

export default async () => {
  const instanceBuilder = new InstanceBuilder();

  instanceBuilder.buildConfig((builder: ConfigBuilder) => {
    builder.setBasePath(path.join(__dirname, "../../configs"));
  });

  instanceBuilder.buildDatabase((builder: DatabaseBuilder) => {
    builder.setEntitiesPath(path.join(__dirname, "../../database"));
  });

  instanceBuilder.buildHandlers((builder: HandlerBuilder) => {
    builder.setBasePath(__dirname);
  });

  instanceBuilder.buildRedis((builder: RedisBuilder) => {
    builder.setRedisOptions(instanceBuilder?.config?.world_server.redis);
  });

  instanceBuilder.buildServer((builder: ServerBuilder) => {
    builder.setServerType(ServerType.WORLD_SERVER);
    builder.addServer(new WorldServer(instanceBuilder.config?.world_server.server));
  });

  instanceBuilder.buildResource((builder: ResourceBuilder) => {
    builder.setRedisOptions(instanceBuilder?.config?.world_server.redis);
  });

  const instance = await instanceBuilder.build();
  worldIntercom(instance);

  global.GameConfig = instanceBuilder.config
  global.TimeStarted = new Date().getTime();
};

function worldIntercom(instance: IInstance) {
  const { config, server, publisher, subscriber } = instance;
  const logger = server?.logger;
  const master = buildEncryptionKeyFromString(
    config?.world_server.security["master-password"]
  ).toString("hex");

  let scheduler: ScheduledTask;

  const channel: IChannel = {
    id: randomId(),
    name: config?.world_server.settings.name,
    host: config?.world_server.server.host,
    port: config?.world_server.server.port,
    enabled: true,
    currentUsers: 0,
    maxUsers: config?.world_server.settings["maximum-users"],
    pkEnabled: config?.world_server.settings["pk-enabled"],
  };

  subscriber?.subscribe(RedisChannel.CLUSTER_CHANNEL, (err) => {
    if (!err) {
      logger?.info("World server subscribed to CLUSTER_CHANNEL successfully");
      setTimeout(() => {
        logger?.info("Sending ADD_CHANNEL message:", JSON.stringify(channel));
        sendMessage(MessageCommand.ADD_CHANNEL, channel);
      }, 500); // for dev: temp delay for 500ms
    } else {
      logger?.error("Failed to subscribe to CLUSTER_CHANNEL:", err);
    }
  });
  subscriber?.on("message", processChannelMessage.bind(this));

  function randomId() {
    return FFRandom.random(0, Math.pow(2, 32) / 2 - 1);
  }

  function processChannelMessage(redisChannel: RedisChannel, message: string) {
    if (redisChannel !== RedisChannel.CLUSTER_CHANNEL) return;
    if (!isValidEncryptionString(message, master)) {
      logger?.warn("Received invalid encrypted message");
      return;
    }
    const decrypted = parseMessage(decryptString(message, master));
    if (decrypted) {
      if (decrypted.sender === ServerType.WORLD_SERVER) return;
      logger?.info("World server received message:", JSON.stringify(decrypted));
      switch (decrypted.command) {
        case MessageCommand.CLUSTER_ONLINE: {
          sendMessage(MessageCommand.ADD_CHANNEL, channel);
          break;
        }

        case MessageCommand.CHANNEL_ADDED: {
          // console.log(decrypted.data.name, channel.name);
          if (decrypted.data.name === channel.name) {
            schedulePing();
          }
          break;
        }

        case MessageCommand.CHANNEL_EXIST: {
          if (decrypted.data.name === channel.name) {
            schedulePing();
          }
          break;
        }

        case MessageCommand.CHANNEL_ID_EXIST: {
          if (decrypted.data.name === channel.name) {
            channel.id = randomId();
            sendMessage(MessageCommand.ADD_CHANNEL, channel);
          }
          break;
        }
      }
    }
  }

  function schedulePing() {
    if (scheduler) {
      scheduler.stop();
    }
    scheduler = cron.schedule("*/15 * * * * *", () => {
      sendMessage(MessageCommand.PING, channel);
    });
  }

  function sendMessage(command: MessageCommand, message: any = null) {
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
  }
}
