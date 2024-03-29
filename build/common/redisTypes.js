"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageCommand = exports.RedisChannel = void 0;
var RedisChannel;
(function (RedisChannel) {
    RedisChannel["CORE_CHANNEL"] = "core_channel";
    RedisChannel["CLUSTER_CHANNEL"] = "cluster_channel";
})(RedisChannel || (exports.RedisChannel = RedisChannel = {}));
var MessageCommand;
(function (MessageCommand) {
    MessageCommand["PING"] = "ping";
    MessageCommand["GET_CLUSTER_LIST"] = "get_cluster_list";
    MessageCommand["CLUSTER_LIST"] = "cluster_list";
    MessageCommand["ADD_CLUSTER"] = "add_cluster";
    MessageCommand["CLUSTER_REMOVED"] = "cluster_removed";
    MessageCommand["CLUSTER_ADDED"] = "cluster_added";
    MessageCommand["CLUSTER_UPDATED"] = "cluster_updated";
    MessageCommand["CORE_ONLINE"] = "core_online";
    MessageCommand["CLUSTER_ONLINE"] = "cluster_online";
    MessageCommand["ADD_CHANNEL"] = "add_channel";
    MessageCommand["CHANNEL_ADDED"] = "channel_added";
    MessageCommand["CHANNEL_REMOVED"] = "channel_removed";
    MessageCommand["CHANNEL_EXIST"] = "channel_exist";
    MessageCommand["CHANNEL_ID_EXIST"] = "channel_id_exist";
})(MessageCommand || (exports.MessageCommand = MessageCommand = {}));
