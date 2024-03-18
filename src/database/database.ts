import path from "path";
import fs from "fs-extra";
import { DataSource } from "typeorm";
import { ServerTypes } from "../common/serverTypes";
import { Logger, SetLogger } from "../helpers/logger";

// Decorator to set logger type for Database class
@SetLogger(ServerTypes.DATABASE_SERVER)
export class Database {
  public connection?: DataSource; // Data source connection
  public config: any; // Database configuration
  public basePath: string; // Base path for file operations
  private models: Map<string, any> = new Map(); // Map to store loaded models

  // Constructor to initialize Database instance
  constructor(config: any) {
    this.config = config;
  }

  // Method to start the database connection
  async start() {
    try {
      // Load database models
      await this.loadModels();

      // Create data source connection
      this.connection = new DataSource({
        ...this.config,
        entities: [...this.models.values()], // Load entities from loaded models
      });

      // Initialize connection
      await this.connection.initialize();
      
      // Log successful connection
      Logger.info("Connected to database successfully");
    } catch (error) {
      // Log error if connection fails
      Logger.error("Error connecting to database:", error);
      throw error;
    }
  }

  // Method to load models from the specified folder
  async loadModels(): Promise<void> {
    const modelsFolder = path.join(this.basePath, "models"); // Path to models folder

    try {
      const files = await fs.readdir(modelsFolder); // Read files in models folder

      // Iterate through files
      for (const file of files) {
        if (file.endsWith(".ts")) {
          const module = await import(path.join(modelsFolder, file)); // Import model file
          this.models.set(module.default.name, module.default); // Add model to map
        }
      }
    } catch (error) {
      // Log error if loading models fails
      console.log(error); // For debugging purposes, consider removing this in production
      Logger.error("Error loading models:", error);
    }
  }

  // Method to get entity by name
  getEntity(name: string) {
    return this.connection?.getRepository(this.models.get(name)); // Return entity repository
  }
}
