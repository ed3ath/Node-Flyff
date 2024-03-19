import { join } from "path";
import _ from "lodash";

import { InstanceBuilder } from "../../builders/instanceBuilder";
import { ConfigBuilder } from "../../builders/configBuilder";
import {
  DatabaseBuilder,
  IDatabaseOptions,
} from "../../builders/databaseBuilder";
import { HandlerBuilder } from "../../builders/handlerBuilder";
import { ServerBuilder } from "../../builders/serverBuilder";
import { ServerType } from "../../common/serverType";
import { IServerConfig } from "../../libraries/tcpServer";
import { sleep } from "../../helpers/sleep";

export default async () => {
  const instanceBuilder = new InstanceBuilder();

  instanceBuilder.buildConfig((builder: ConfigBuilder) => {
    builder.setBasePath(join(__dirname, "../../configs"));
    builder.setConfigFile("login_server.yaml");
  });

  const { config } = instanceBuilder.getInstance();

  await instanceBuilder.buildDatabase(async (builder: DatabaseBuilder) => {
    builder.setModelsPath(join(__dirname, "../../entities"));

    await Promise.all(
      _.map(_.get(config, "database", []), async (options: any) => {
        await builder.addConnection({
          name: options.name,
          dataSource: {
            type: _.get(options, "provider", "sqlite"),
            database: _.get(options, "connection-string", options.name),
            url: _.get(options, "url"),
            host: _.get(options, "host"),
            port: _.get(options, "port"),
            username: _.get(options, "username"),
            password: _.get(options, "password"),
          },
          entities: [],
        } as IDatabaseOptions);
      })
    );
    await builder.build();
  });

  await instanceBuilder.buildHandlers(async (builder: HandlerBuilder) => {
    builder.setBasePath(__dirname);
    builder.setType("server");
    await builder.loadHandlers();
  });

  await instanceBuilder.buildHandlers(async (builder: HandlerBuilder) => {
    builder.setBasePath(__dirname);
    builder.setType("client");
    await builder.loadHandlers();
  });

  await instanceBuilder.buildServer((builder: ServerBuilder) => {
    builder.setServerType(ServerType.LOGIN_SERVER);
    builder.addServer(config?.server as IServerConfig);
    builder.addHandlers(instanceBuilder.getServerHandlers());
  });
  global.LoginServerInstance = instanceBuilder.getInstance();
};
