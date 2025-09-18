import { ErrorType } from '../types/errorType';
import { Socket } from "net";
import { FlyffPacket } from "../libraries/flyffPacket";
import Character from "../database/character";

export interface IUserConnection {
  username: string | null;
  userId: number | null;
  sessionId: number;
  socket: Socket;
  player: any; // Will be set to Player instance in world server
  selectedCharacterId: number | null; // Track selected character
  selectedCharacterName: string | null; // Track selected character name
  authKey: number | null; // Track auth key for world server
  send(packet: FlyffPacket): void;
  sendError(errorType: ErrorType): void;
  sendCharacterList(characters: Character[], authKey: number): void;
  disconnect(): void;
}
