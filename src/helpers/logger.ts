import clc from "cli-color";
import moment from "moment";

import { ServerTypes } from "../common/serverTypes";

export function SetLogger(sender: ServerTypes | string) {
  return function (target: any) {
    target.sender = sender;
  };
}

export class Logger {
  private static readonly SeverityMap: any = {
    info: clc.cyan,
    warn: clc.yellow,
    error: clc.red,
    success: clc.green,
    main: clc.magenta,
  };

  private static sender: ServerTypes = ServerTypes.LOGIN_SERVER;

  public static info(...message: any[]): void {
    this.log("info", message);
  }

  public static warn(...message: any[]): void {
    this.log("warn", message);
  }

  public static error(...message: any[]): void {
    this.log("error", message);
  }

  public static success(...message: any[]): void {
    this.log("success", message);
  }

  public static main(...message: any[]): void {
    this.log("main", message);
  }

  private static log(level: string = "main", ...message: any[]) {
    console.log(
      clc.blue(moment().format("LTS")) +
        " " +
        Logger.SeverityMap[level](`[${Logger.sender.toUpperCase()}]`) +
        " " +
        clc.white.bold(message.join(" "))
    );
  }
}