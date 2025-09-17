import fs from "fs-extra";
import { Logger } from "./logger";
import { tryParseInt, tryParseFloat, cleanString } from "./parsing";

export class ResourceTableFile {
  private logger: Logger;
  private content: string;
  private headers: string[] = [];
  private records: string[][] = [];
  private defines: Map<string, number>;

  constructor(filePath: string, headerLineIndex: number = 0, defines?: Map<string, number>) {
    this.logger = new Logger("ResourceTableFile");
    this.defines = defines || new Map();

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    try {
      this.content = fs.readFileSync(filePath, "utf-8");
    } catch (utf8Error) {
      this.logger.warn(`Failed to read ${filePath} as UTF-8, trying UTF-16LE:`, utf8Error);
      try {
        this.content = fs.readFileSync(filePath, "utf16le");
      } catch (utf16Error) {
        this.logger.warn(`Failed to read ${filePath} as UTF-16LE, trying latin1:`, utf16Error);
        this.content = fs.readFileSync(filePath, "latin1");
      }
    }
    this.parseContent(headerLineIndex);
  }

  private parseContent(headerLineIndex: number): void {
    const allLines = this.content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Look for commented header line (contains column names like dwID, szName, etc.)
    const commentedHeaderLine = allLines.find(line =>
      line.startsWith('//') && line.includes('dwID') && line.includes('szName')
    );

    if (commentedHeaderLine) {
      // Use the commented header line, removing the // prefix
      this.headers = commentedHeaderLine.substring(2).split('\t');
    } else {
      // Fallback to the old method for files that don't have commented headers
      const nonCommentLines = allLines.filter(line => !line.startsWith('//'));

      if (nonCommentLines.length <= headerLineIndex) {
        throw new Error("Header line index is out of bounds");
      }

      this.headers = nonCommentLines[headerLineIndex].split('\t');
    }

    // Process all non-comment lines as data
    const dataLines = allLines.filter(line => !line.startsWith('//'));

    for (const line of dataLines) {
      const record = line.split('\t');
      if (record.length === this.headers.length) {
        this.records.push(record);
      }
    }
  }

  public getRecords<T>(): T[] {
    const results: T[] = [];

    for (const record of this.records) {
      const obj: any = {};

      for (let i = 0; i < this.headers.length; i++) {
        const header = this.headers[i];
        const value = record[i];

        if (header === "dwID") {
          // For dwID field, try to look up the value in defines first
          const cleanValue = cleanString(value);
          const defineValue = this.defines.get(cleanValue);
          if (defineValue !== undefined) {
            this.logger.info(`ResourceTableFile: Found define for ${cleanValue} = ${defineValue}`);
            obj[header] = defineValue; // Use the numeric define value
          } else {
            this.logger.warn(`ResourceTableFile: No define found for ${cleanValue}, defines size: ${this.defines.size}`);
            // Debug: Show first 10 define keys
            const defineKeys = Array.from(this.defines.keys()).slice(0, 10);
            this.logger.info(`ResourceTableFile: Available define keys (first 10): ${defineKeys.join(', ')}`);
            obj[header] = cleanValue; // Fallback to the string value
          }
        } else if (header.includes("Name") || header.includes("IdentifierName")) {
          obj[header] = cleanString(value);
        } else if (value.includes('.')) {
          obj[header] = tryParseFloat(value);
        } else {
          obj[header] = tryParseInt(value);
        }
      }

      results.push(obj as T);
    }

    return results;
  }

  public dispose(): void {
    this.records = [];
    this.headers = [];
  }
}