import { Logger } from "../helpers/logger";

export abstract class BaseResource {
  protected readonly logger: Logger;
  protected loadedCount: number = 0;
  protected readonly resourceType: string;

  constructor(resourceType: string) {
    this.resourceType = resourceType;
    this.logger = new Logger(`${resourceType} Resources`);
  }

  public getLoadedCount(): number {
    return this.loadedCount;
  }

  protected logLoadStart(): void {
    this.logger.info(`Loading ${this.resourceType.toLowerCase()}...`);
  }

  protected logLoadSuccess(count: number, elapsed: number): void {
    this.loadedCount = count;
    this.logger.success(`${count} ${this.resourceType.toLowerCase()} loaded in ${elapsed}ms`);
  }

  protected logLoadWarning(message: string): void {
    this.logger.warn(`${this.resourceType}: ${message}`);
  }

  protected logLoadError(message: string, error?: Error): void {
    this.logger.error(`${this.resourceType}: ${message}`, error?.message || '');
  }

  protected logFileNotFound(filePath: string): void {
    this.logger.warn(`${this.resourceType}: File not found - ${filePath}`);
  }

  protected logDependencyMissing(dependency: string): void {
    this.logger.warn(`${this.resourceType}: Missing dependency - ${dependency}`);
  }
}