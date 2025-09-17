export interface ICluster {
  name: string;
  host: string;
  port: number;
  lastPing?: number;
  channels: IChannel[];
  enabled: boolean
}

export interface IChannel {
  id?: number;
  name: string;
  host: string;
  port: string;
  maxUsers: number;
  currentUsers: number;
  enabled: boolean;
  pkEnabled: boolean;
  lastPing?: number;
}