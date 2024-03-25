import path from "path";
import _ from "lodash";
import cron, { ScheduledTask } from "node-cron";

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
    builder.setConfigFile("world_server.yaml");
  });

  instanceBuilder.buildDatabase((builder: DatabaseBuilder) => {
    builder.setEntitiesPath(path.join(__dirname, "../../database"));
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

  instanceBuilder.buildResource((builder: ResourceBuilder) => {
    const resPath = path.join(global.projectPath, "resources", "res");
    builder.setResourcePath({
      itemsProp: path.join(resPath, "data", "propItem.txt"),
      itemsText: path.join(resPath, "data", "propItem.txt.txt"),
      defineItem: path.join(resPath, "data", "defineItem.h"),
      defineItemKind: path.join(resPath, "data", "defineItemKind.h"),
      defineJob: path.join(resPath, "data", "defineJob.h"),
      moversProp: path.join(resPath, "data", "propMover..txt"),
      moversText: path.join(resPath, "data", "propMover.txt.txt"),
      moversEx: path.join(resPath, "custom", "propMoverEx.yaml"),
    });
    builder.setRedisOptions(instanceBuilder?.config?.redis);
  });

  const instance = await instanceBuilder.build();
  worldIntercom(instance);
};

function worldIntercom(instance: IInstance) {
  const { config, server, publisher, subscriber } = instance;
  const logger = server?.logger;
  const master = buildEncryptionKeyFromString(
    config?.security["master-password"]
  ).toString("hex");

  let scheduler: ScheduledTask;

  const channel: IChannel = {
    id: randomId(),
    name: config?.settings.name,
    host: config?.server.host,
    port: config?.server.port,
    enabled: true,
    currentUsers: 0,
    maxUsers: config?.settings["maximum-users"],
    pkEnabled: config?.settings["pk-enabled"],
  };

  subscriber?.subscribe(RedisChannel.CLUSTER_CHANNEL, (err) => {
    if (!err) {
      setTimeout(() => {
        sendMessage(MessageCommand.ADD_CHANNEL, channel);
      }, 500); // for dev: temp delay for 500ms
    } else {
      logger?.error(err);
    }
  });
  subscriber?.on("message", processChannelMessage.bind(this));

  function randomId() {
    return FFRandom.random(0, Math.pow(2, 32) / 2 - 1);
  }

  function processChannelMessage(redisChannel: RedisChannel, message: string) {
    if (redisChannel !== RedisChannel.CLUSTER_CHANNEL) return;
    if (!isValidEncryptionString(message, master)) return; // reject invalid messages
    const decrypted = parseMessage(decryptString(message, master));
    if (decrypted) {
      if (decrypted.sender === ServerType.WORLD_SERVER) return;
      // console.log(decrypted);
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
