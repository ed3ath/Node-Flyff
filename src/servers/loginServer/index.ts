import { join } from "path";
import _ from "lodash";
import cron from "node-cron";

import { InstanceBuilder } from "../../builders/instanceBuilder";
import { ConfigBuilder } from "../../builders/configBuilder";
import { DatabaseBuilder } from "../../builders/databaseBuilder";
import { HandlerBuilder } from "../../builders/handlerBuilder";
import { ServerBuilder } from "../../builders/serverBuilder";
import { ServerType } from "../../common/serverType";
import { LoginServer } from "./loginServer";
import { IChannel, ICluster } from "../../interfaces/cluster";
import { IInstance } from "../../interfaces/instance";
import { MessageCommand, RedisChannel } from "../../common/redisTypes";
import {
  buildEncryptionKeyFromString,
  decryptString,
  encryptMessage,
  encryptString,
  isValidEncryptionString,
  parseMessage,
} from "../../libraries/crypto";
import { RedisBuilder } from "../../builders/redisBuilder";

export default async () => {
  const instanceBuilder = new InstanceBuilder();

  instanceBuilder.buildConfig((builder: ConfigBuilder) => {
    builder.setBasePath(join(__dirname, "../../configs"));
    builder.setConfigFile("login_server.yaml");
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
    builder.setServerType(ServerType.LOGIN_SERVER);
    builder.addServer(new LoginServer(instanceBuilder.config?.server));
  });
  const instance = await instanceBuilder.build();
  await coreIntercom(instance);
};

async function coreIntercom(instance: IInstance) {
  const { config, server, publisher, subscriber, client } = instance;
  const logger = server?.logger;
  const master = buildEncryptionKeyFromString(
    config?.security["master-password"]
  ).toString("hex");

  /////////// MAIN //////////
  subscriber?.subscribe(RedisChannel.CORE_CHANNEL, (err) => {
    if (!err) {
      sendMessage(MessageCommand.CORE_ONLINE);
    } else {
      logger?.error(err);
    }
  });
  subscriber?.on("message", processChannelMessage.bind(this));

  cron.schedule("*/30 * * * * *", async () => {
    const clusters = await client?.getAllClusters();
    clusters?.forEach(async (cluster) => {
      // console.log(cluster.lastPing, new Date().getTime());
      if (
        cluster.lastPing &&
        new Date().getTime() > cluster.lastPing + 30 * 1000
      ) {
        await client?.deleteCluster(cluster.name);
        sendMessage(MessageCommand.CLUSTER_REMOVED, cluster);
        logger?.info(
          "Cluster",
          cluster.name,
          "has been removed. Reason: Timeout"
        );
      }
    });
  });

  ////// MAIN //////////

  async function processChannelMessage(channel: RedisChannel, message: string) {
    if (channel !== RedisChannel.CORE_CHANNEL) return;
    if (!isValidEncryptionString(message, master)) return; // reject invalid messages
    const decrypted = parseMessage(decryptString(message, master));
    if (decrypted) {
      if (decrypted.sender === ServerType.LOGIN_SERVER) return;
      // console.log(decrypted);

      switch (decrypted.command) {
        case MessageCommand.PING: {
          const cluster: ICluster | null =
            (await client?.getCluster(decrypted.data?.name)) ?? null;
          if (cluster) {
            cluster.lastPing = new Date().getTime();
            await client?.updateCluster(cluster);
          }
          break;
        }

        case MessageCommand.GET_CLUSTER_LIST: {
          sendMessage(
            MessageCommand.CLUSTER_LIST,
            await client?.getAllClusters()
          );
          break;
        }

        case MessageCommand.ADD_CLUSTER: {
          const cluster: ICluster | null =
            (await client?.getCluster(decrypted.data.name)) ?? null;
          if (!cluster) {
            const newCluster = {
              ...decrypted.data,
              lastPing: new Date().getTime(),
            };
            await client?.insertCluster(newCluster);
          } else {
            await client?.updateCluster({
              ...decrypted.data,
              lastPing: new Date().getTime(),
            });
          }
          sendMessage(MessageCommand.CLUSTER_ADDED, decrypted.data);
          break;
        }

        case MessageCommand.CLUSTER_UPDATED: {
          const cluster: ICluster | null =
            (await client?.getCluster(decrypted.data.name)) ?? null;
          if (cluster) {
            const newCluster = {
              ...decrypted.data,
              lastPing: new Date().getTime(),
            };
            await client?.updateCluster(newCluster);
          }
          break;
        }
      }
    }
  }
  function sendMessage(command: MessageCommand, message: any = null) {
    publisher?.publish(
      RedisChannel.CORE_CHANNEL,
      encryptMessage(
        typeof message === "object"
          ? JSON.stringify({
              sender: ServerType.LOGIN_SERVER,
              command,
              data: message,
            })
          : message,
        master
      )
    );
  }
}
