"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConnection = exports.TcpServer = void 0;
require("reflect-metadata");
const net_1 = require("net");
const lodash_1 = __importDefault(require("lodash"));
const flyffPacket_1 = require("./flyffPacket");
const packetType_1 = require("../common/packetType");
const logger_1 = require("../helpers/logger");
const serverType_1 = require("../common/serverType");
// Main TCP Server class
class TcpServer {
    // Constructor to initialize TcpServer instance
    constructor(serverType, options) {
        this.handlers = new Map();
        this.connections = new Map();
        // Method to check if a user is connected
        this.isUserConnected = (userConnection) => this.connections.has(userConnection.sessionId);
        this.isUserAccountConnected = (account) => !lodash_1.default.isNil(this.getConnectionByAccount(account));
        this.logger = new logger_1.Logger(serverType);
        this.serverType = serverType;
        this.options = options;
    }
    // Method to start the server
    start() {
        this.logger.main("Starting...");
        if (!this.handlers.size) {
            this.logger.warn("No packet handlers imported.");
        }
        this.server = (0, net_1.createServer)(this.onConnection.bind(this));
        this.server.listen(this.options.port, this.options.host, this.onServerStart.bind(this));
    }
    setConfig(config) {
        this.config = config;
    }
    addHandlers(handlers) {
        this.handlers = handlers;
    }
    addRedisClient(redisClient) {
        this.redisClient = redisClient;
    }
    // Method called when server starts listening
    onServerStart() {
        this.logger.info(`Server listening on ${this.options.host}:${this.options.port}`);
        this.time = new Date().getTime();
    }
    // Method called when a new connection is established
    onConnection(socket) {
        const userConnection = new UserConnection(socket);
        if (this.isUserConnected(userConnection))
            return;
        this.connections.set(userConnection.sessionId, userConnection);
        this.logger.success(`New connection established with session ID: ${userConnection.sessionId} (${socket.remoteAddress}:${socket.remotePort})`);
        if (this.serverType !== serverType_1.ServerType.CORE_SERVER) {
            // Send welcome packet to the client
            const packet = new flyffPacket_1.FlyffPacket();
            packet.writeUInt32LE(packetType_1.PacketType.WELCOME);
            packet.writeUInt32LE(userConnection.sessionId);
            userConnection.send(packet);
        }
        // Attach event listeners for data, close, and error events
        socket.on("data", (data) => __awaiter(this, void 0, void 0, function* () {
            yield this.onData(data, userConnection);
        }));
        socket.on("close", () => this.onDisconnect(userConnection.sessionId));
        socket.on("error", (error) => this.onError(error, userConnection.sessionId));
    }
    // Method called when data is received from a client
    onData(data, userConnection) {
        return __awaiter(this, void 0, void 0, function* () {
            const packet = new flyffPacket_1.FlyffPacket(data, this.serverType === serverType_1.ServerType.LOGIN_SERVER);
            const HandlerClass = this.handlers.get(packet.PacketType);
            if (HandlerClass) {
                // Execute the corresponding packet handler
                const handlerInstance = new HandlerClass(packet);
                handlerInstance.userConnection = userConnection;
                handlerInstance.server = this;
                yield handlerInstance.wrappedExecute();
            }
            else {
                // Log unimplemented packet type
                this.logger.warn(`Unimplemented packet ${this.getPacketTypeId(packet.PacketType)} (${(0, packetType_1.ToStringHex)(packet.PacketType)})`);
            }
        });
    }
    // Method called when a connection is closed
    onDisconnect(sessionId) {
        if (this.connections.has(sessionId)) {
            this.connections.delete(sessionId);
            this.logger.warn(`Connection with session ID ${sessionId} closed`);
        }
    }
    // Method called when an error occurs
    onError(error, sessionId = null) {
        console.log(error);
        if (sessionId) {
            this.logger.error(`Error occurred for session ID ${sessionId}: ${error}`);
        }
        else {
            this.logger.error(error);
        }
    }
    // Utility method to get packet type ID as string
    getPacketTypeId(value) {
        for (const key in packetType_1.PacketType) {
            if (packetType_1.PacketType[key] === value) {
                return key;
            }
        }
        return undefined;
    }
    // Method to disconnect a user
    disconnectUser(userConnection) {
        userConnection.disconnect();
    }
    disconnectByAccount(account) {
        const userConnection = this.getConnectionByAccount(account);
        if (userConnection) {
            userConnection.disconnect();
        }
    }
    getConnectionByAccount(account) {
        let userConnection = null;
        this.connections.forEach((connection) => {
            if (connection.username === account) {
                userConnection = connection;
            }
        });
        return userConnection;
    }
}
exports.TcpServer = TcpServer;
class UserConnection {
    // Constructor to initialize a user connection
    constructor(socket) {
        this.userId = null;
        this.username = null;
        this.sessionId = Math.floor(Math.random() * Math.pow(2, 32));
        this.socket = socket;
    }
    // Method called when data is received (can be overridden)
    onData(packet) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    // Method to send a packet to the client
    send(packet) {
        this.socket.write(flyffPacket_1.FlyffPacket.appendHeader(packet.buffer));
    }
    sendError(errorType) {
        const packet = new flyffPacket_1.FlyffPacket(packetType_1.PacketType.ERROR);
        packet.writeUInt32LE(errorType);
        return this.send(packet);
    }
    sendCharacterList(characters, authKey) {
        const packet = new flyffPacket_1.FlyffPacket(packetType_1.PacketType.CHARACTER_LIST);
        const filteredCharacters = lodash_1.default.filter(characters, { deleted: false });
        packet.writeInt32LE(authKey);
        packet.writeInt32LE(filteredCharacters.length || 0);
        lodash_1.default.forEach(filteredCharacters, (character) => {
            packet.writeInt32LE(character.slot);
            packet.writeInt32LE(character.id); // this number represents the selected character in the window
            packet.writeInt32LE(character.mapId);
            packet.writeInt32LE(0x0b + character.gender); // Model id
            packet.writeStringLE(character.name);
            packet.writeSingleLE(character.positionX);
            packet.writeSingleLE(character.positionY);
            packet.writeSingleLE(character.positionZ);
            packet.writeInt32LE(character.id);
            packet.writeInt32LE(0); // Party id
            packet.writeInt32LE(0); // Guild id
            packet.writeInt32LE(0); // War Id
            packet.writeInt32LE(character.skinSetId);
            packet.writeInt32LE(character.hairId);
            packet.writeUInt32(character.hairColor);
            packet.writeInt32LE(character.faceId);
            packet.writeByte(character.gender);
            packet.writeInt32LE(character.jobId);
            packet.writeInt32LE(character.level);
            packet.writeInt32LE(0); // Job Level (Maybe master or hero ?)
            packet.writeInt32LE(character.strength);
            packet.writeInt32LE(character.stamina);
            packet.writeInt32LE(character.dexterity);
            packet.writeInt32LE(character.intelligence);
            packet.writeInt32LE(0); // Mode ??
            packet.writeInt32LE(character.equipments.length);
            lodash_1.default.forEach(character.equipments, (equipment) => {
                packet.writeInt32LE(equipment.item.itemId);
            });
        });
        packet.writeInt32LE(0);
        return this.send(packet);
    }
    disconnect() {
        this.socket.destroy();
    }
}
exports.UserConnection = UserConnection;
