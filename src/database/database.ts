import path from "path";
import fs from "fs-extra";
import { DataSource } from "typeorm";
import { ServerTypes } from "../common/serverTypes";
import { Logger } from "../helpers/logger";

// Decorator to set logger type for Database class
export class Database {
  private logger: Logger;
  private entities: Map<string, any> = new Map(); // Map to store loaded models
  public name: string;
  public connection?: DataSource; // Data source connection
  public config: any; // Database configuration
  public basePath: string; // Base path for file operations

  // Constructor to initialize Database instance
  constructor(name: string, config: any, basePath: string) {
    this.logger = new Logger(ServerTypes.DATABASE_SERVER);
    this.name = name;
    this.config = config;
    this.basePath = basePath;
  }

  // Method to start the database connection
  async start() {
    try {
      // Load database models
      await this.loadEntities();

      // Create data source connection
      this.connection = new DataSource({
        ...this.config,
        entities: [...this.entities.values()], // Load entities from loaded models
      });

      // Initialize connection
      await this.connection.initialize();
      await this.connection.synchronize();

      // Log successful connection
      this.logger.info(
        "Connected to",
        this.name.toUpperCase(),
        "database successfully"
      );
    } catch (error) {
      // Log error if connection fails
      this.logger.error("Error connecting to database:", error);
      throw error;
    }
  }

  // Method to load models from the specified folder
  async loadEntities(): Promise<void> {
    const modelsFolder = path.join(this.basePath, "models", this.name); // Path to models folder

    try {
      const files = await fs.readdir(modelsFolder); // Read files in models folder

      // Iterate through files
      for (const file of files) {
        if (file.endsWith(".ts")) {
          const module = await import(path.join(modelsFolder, file)); // Import model file
          this.entities.set(module.default.name, module.default); // Add model to map
        }
      }
    } catch (error) {
      // Log error if loading models fails
      console.log(error); // For debugging purposes, consider removing this in production
      this.logger.error("Error loading models:", error);
    }
  }

  // Method to get entity by name
  getEntity(name: string) {
    return this.connection?.getRepository(this.entities.get(name)); // Return entity repository
  }
}
