# NODE-FlyFF - Fly For Fun V19 Emulator

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)](https://www.typescriptlang.org/)

## Overview

Node-FlyFF is a comprehensive, open-source Fly For Fun (FlyFF) V19 emulator built with modern TypeScript and Node.js. This project aims to recreate the classic MMORPG experience with a focus on performance, scalability, and maintainability.

⚠️ **Disclaimer**: This project is **not** affiliated with Gala Lab or any official FlyFF entities. ⚠️

## 🏗️ Architecture

The emulator follows a distributed server architecture:

- **Login Server**: Handles client authentication and server list distribution
- **Cluster Server**: Manages character operations (creation, deletion, selection)
- **World Server**: Core game logic, entity management, and gameplay systems

## 🛠️ Technology Stack

- **Runtime**: Node.js 22+
- **Language**: TypeScript 4.9+
- **Database**: SQLite (development), MySQL (production ready)
- **Caching**: Redis
- **Configuration**: YAML/JSON
- **Development**: Visual Studio Code recommended

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [Redis Server](https://redis.io/) (requires WSL for Windows development)
- [Git](https://git-scm.com/)
- [WSL](https://docs.microsoft.com/en-us/windows/wsl/) (for Windows development)

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/nodejs-flyff.git
   cd nodejs-flyff
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up Redis Server**
   - Windows: Follow the [WSL Redis installation guide](https://redis.io/docs/install/install-redis/install-redis-on-windows/)
   - Linux/macOS: `sudo apt-get install redis-server` or `brew install redis`

4. **Configure the database**
   - SQLite is configured by default for development
   - For MySQL, update the configuration files in `src/configs/`

5. **Start the servers**
   ```bash
   # Start all servers
   yarn dev login    # Login server
   yarn dev cluster  # Cluster server
   yarn dev world    # World server
   ```

## 📊 Feature Implementation Status

### ✅ Completed Features

#### Common Systems
- [x] Logger system
- [x] Cryptography algorithms
- [x] Packet handler infrastructure
- [x] SQL database integration
- [x] Entity Component System architecture
- [x] Resource loading system (Defines, texts, items, NPCs, jobs, exp tables)

#### Entity Systems
- [x] WorldObject base class
- [x] Mover entity (Player/Monster base)
- [x] Player entity with full game systems
- [x] Monster entity with AI behaviors
- [x] NPC entity with dialog/shop systems
- [x] MapItemObject for ground items

#### Core Game Systems
- [x] Visibility System
- [x] Mobility System
- [x] Respawn System
- [x] Inventory System (move, equip/unequip, save, drop, usage)
- [x] Battle System (melee attacks, PvM combat)
- [x] Drop System (pickup gold/items)
- [x] Shop System (buy/sell items)
- [x] NPC Dialog System

### 🔄 In Progress

#### Server Systems
- [ ] Inter-Server communication and caching
- [ ] Client authentication process
- [ ] Character management (create, delete, list)
- [ ] 2nd password verification

#### Game Features
- [ ] Chat System with admin commands
- [ ] Trade System
- [ ] Quest System
- [ ] Character customization system
- [ ] Attribute System

### 📅 Planned Features

#### Advanced Systems
- [ ] Bank System
- [ ] Friend System
- [ ] Motion System
- [ ] Buff Pang System
- [ ] Mailbox System
- [ ] Guild System
- [ ] Skill System
- [ ] Item Bonus System
- [ ] Party System
- [ ] Job System

#### Chat Commands (Planned)
- [ ] `/ci` or `/createitem` - Create items
- [ ] `/getgold` - Add gold to inventory
- [ ] `/teleport` - Teleport to coordinates
- [ ] `/ban|unban` - Player management
- [ ] `/mute|unmute` - Chat moderation
- [ ] `/freeze|unfreeze` - Movement control
- [ ] `/onekill` - Admin combat mode
- [ ] `/nodying` - Invincibility mode
- [ ] `/invisible` - Visibility toggle
- [ ] `/summon monster|player` - Entity summoning

## 🗂️ Project Structure

```
src/
├── abstract/           # Base classes and interfaces
├── common/            # Shared enums and constants
├── configs/           # Server configuration files
├── database/          # Database models and connections
├── entities/          # Game entities (Player, Monster, NPC)
├── helpers/           # Utility functions
├── interfaces/        # TypeScript interfaces
├── libraries/         # Core libraries (packets, networking)
├── protocol/          # Network protocol definitions
├── resources/         # Game data and resource loaders
└── servers/           # Server implementations
    ├── loginServer/
    ├── clusterServer/
    └── worldServer/
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and ensure TypeScript compilation passes
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📈 Performance & Scalability

- **Entity Component System**: Efficient entity management and component-based architecture
- **Redis Caching**: Fast inter-server communication and data caching
- **Async/Await**: Non-blocking I/O operations for optimal performance
- **TypeScript**: Type safety and enhanced developer experience

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/your-repo/nodejs-flyff/issues) page to report bugs or request features.

## 📝 License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- [eD3ath](https://github.com/eD3ath) - Project Creator & Lead Developer

## 🙏 Acknowledgments

- Original FlyFF development team for creating this amazing MMORPG
- Open-source community for tools and libraries
- Contributors and testers who help improve this project

---

**Note**: This is an educational and research project. Please respect the intellectual property rights of the original game creators.