import { PacketType } from "../../../protocol/packetType"
import { FlyffPacket } from '../../../libraries/flyffPacket'
import { PacketHandler } from '../../../libraries/packetHandler'
import { SetPacketType } from '../../../decorators/packetHandler'
import { WorldUser } from '../worldUser'

@SetPacketType(PacketType.CHAT)
export default class Handler extends PacketHandler {
  message: string

  constructor (packet: FlyffPacket) {
    super()
    this.message = packet.readString()
  }

  async execute (): Promise<void> {
    const worldUser = this.userConnection as WorldUser
    const player = worldUser.getPlayer()

    if (!player) {
      this.logger.warn('CHAT packet received but player is not available')
      return
    }

    if (!this.message || this.message.trim() === '') {
      return
    }

    if (this.message.startsWith('/')) {
      // Handle emotes and commands
      if (Handler.isEmote(this.message)) {
        player.speak(this.message)
      } else {
        await this.handleCommand(this.message, player)
      }
    } else {
      // Regular chat message
      player.speak(this.message)
    }
  }

  private static readonly EMOTES = [
    '/laugh',
    '/sad',
    '/kiss',
    '/surprise',
    '/blush',
    '/anger',
    '/sigh',
    '/wink',
    '/ache',
    '/hunger',
    '/yummy',
    '/sneer',
    '/sparkle',
    '/ridicule',
    '/sleepy',
    '/rich',
    '/glare',
    '/sweat',
    '/cat face',
    '/tongue',
    '/mad',
    '/aha',
    '/embarrassed',
    '/help',
    '/crazy',
    '/oh!',
    '/confused',
    '/ouch',
    '/love'
  ]

  private static isEmote (message: string): boolean {
    return Handler.EMOTES.includes(message)
  }

  private async handleCommand (commandInput: string, player: any): Promise<void> {
    try {
      const commandParts = commandInput.split(' ')
      const commandName = commandParts[0]

      // TODO: Implement chat command system similar to C# ChatCommandManager
      // For now, just log unknown commands
      this.logger.warn(`Unknown chat command: '${commandName}' from player: ${player.name}`)

      // You can add specific command handlers here:
      // const chatCommand = ChatCommandManager.get(commandName, player.authority);
      // if (chatCommand) {
      //   const parameters = this.getCommandParameters(commandInput, commandName, chatCommand.parsingType);
      //   await chatCommand.execute(player, parameters);
      // } else {
      //   throw new Error(`Cannot find chat command: '${commandName}'`);
      // }
    } catch (error) {
      this.logger.error(`Error handling command '${commandInput}': ${error}`)
    }
  }

  private getCommandParameters (commandInput: string, commandName: string, parsingType: 'Default' | 'FullString' = 'Default'): string[] {
    if (parsingType === 'Default') {
      const commandParameters = commandInput.substring(commandName.length)
      // Match quoted strings or non-space sequences
      const matches = commandParameters.match(/"[^"]+"|[^\s]+/g)
      return matches ? matches.map(match => match.replace(/^"|"$/g, '')) : []
    } else {
      // FullString parsing type - return everything after command name as single parameter
      return [commandInput.replace(commandName, '').trim()]
    }
  }
}