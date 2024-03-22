export enum RedisChannel {
  CORE_CHANNEL = "core_channel",
  CLUSTER_CHANNEL = "cluster_channel",
}

export enum MessageCommand {
  PING = "ping",
  GET_CLUSTER_LIST = "get_cluster_list",
  CLUSTER_LIST = "cluster_list",
  ADD_CLUSTER = "add_cluster",
  CLUSTER_REMOVED = "cluster_removed",
  CLUSTER_ADDED = "cluster_added",
  CLUSTER_UPDATED = "cluster_updated",
  CORE_ONLINE = "core_online",
  CLUSTER_ONLINE = "cluster_online",
  ADD_CHANNEL = "add_channel",
  CHANNEL_ADDED = "channel_added",
  CHANNEL_REMOVED = "channel_removed",
}
