import clc from "cli-color";
import moment from "moment";

import { ServerType } from "../common/serverType";

export class Logger {
  private readonly sender: ServerType | string = "MAIN";

  private static readonly SeverityMap: any = {
    info: clc.cyan,
    warn: clc.yellow,
    error: clc.red,
    success: clc.green,
    main: clc.magenta,
  };

  constructor(sender: ServerType | string) {
    this.sender = sender;
  }

  public info(...message: any[]): void {
    this.log("info", ...message);
  }

  public warn(...message: any[]): void {
    this.log("warn", ...message);
  }

  public error(...message: any[]): void {
    this.log("error", ...message);
  }

  public success(...message: any[]): void {
    this.log("success", ...message);
  }

  public main(...message: any[]): void {
    this.log("main", ...message);
  }

  private log(level: string = "main", ...message: any[]) {
    console.log(
      clc.blue(moment().format("LTS")) +
        " " +
        Logger.SeverityMap[level](`[${this.sender.toUpperCase()}] ${level.toUpperCase()} -`) +
        " " +
        clc.white.bold(message.join(" "))
    );
  }
}