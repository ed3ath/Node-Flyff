import fs from "fs-extra";
import { Logger } from "./logger";

export interface LuaTable {
  [key: string]: any;
  getValues<T>(): T[];
  getValue<T>(key: string): T | undefined;
  getValueOrDefault<T>(key: string, defaultValue: T): T;
}

export class LuaParser {
  private logger: Logger;

  constructor() {
    this.logger = new Logger("LuaParser");
  }

  public parseFile(filePath: string): LuaTable | null {
    if (!fs.existsSync(filePath)) {
      this.logger.error(`Lua file not found: ${filePath}`);
      return null;
    }

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      return this.parseContent(content);
    } catch (error) {
      this.logger.error(`Failed to parse Lua file ${filePath}:`, error);
      return null;
    }
  }

  private parseContent(content: string): LuaTable {
    const result: LuaTable = this.createLuaTable({});

    // Remove comments and normalize whitespace
    const cleanContent = content
      .replace(/--.*$/gm, "") // Remove line comments
      .replace(/--\[\[[\s\S]*?\]\]/g, "") // Remove block comments
      .replace(/\s+/g, " ")
      .trim();

    // Find the main table definition using a more robust regex
    const tableMatch = cleanContent.match(/(\w+)\s*=\s*(\{.*\})/s);
    if (!tableMatch) {
      return result;
    }

    const tableName = tableMatch[1];
    const tableContent = tableMatch[2];

    // Parse the table content and wrap it as a LuaTable
    const parsedTable = this.parseTableContent(tableContent);
    result[tableName] = this.createLuaTable(parsedTable);

    return result;
  }

  private parseTableContent(content: string): any {
    // Remove outer braces
    const innerContent = content.trim().slice(1, -1).trim();

    if (!innerContent) {
      return {};
    }

    const result: any = {};
    const tokens = this.tokenize(innerContent);
    let arrayIndex = 1; // Lua arrays start at 1

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token.type === 'assignment') {
        // Handle key = value assignment
        const key = token.key;
        if (key) {
          const value = this.parseTokenValue(token.value);
          result[key] = value;
        }
      } else if (token.type === 'value') {
        // Handle array-style values
        const value = this.parseTokenValue(token.value);
        result[arrayIndex++] = value;
      }
    }

    return result;
  }

  private tokenize(content: string): Array<{type: 'assignment' | 'value', key?: string, value: string}> {
    const tokens: Array<{type: 'assignment' | 'value', key?: string, value: string}> = [];
    let i = 0;

    while (i < content.length) {
      // Skip whitespace
      while (i < content.length && /\s/.test(content[i])) {
        i++;
      }

      if (i >= content.length) break;

      const start = i;

      // Check if this is a table (starts with {)
      if (content[i] === '{') {
        const tableEnd = this.findMatchingBrace(content, i);
        const tableContent = content.slice(i, tableEnd + 1);
        tokens.push({ type: 'value', value: tableContent });
        i = tableEnd + 1;

        // Skip comma if present
        while (i < content.length && /[\s,]/.test(content[i])) {
          i++;
        }
        continue;
      }

      // Look for assignment pattern (key = value)
      const assignmentMatch = this.findAssignment(content, i);
      if (assignmentMatch) {
        tokens.push({
          type: 'assignment',
          key: assignmentMatch.key,
          value: assignmentMatch.value
        });
        i = assignmentMatch.endIndex;
        continue;
      }

      // Otherwise, parse as a simple value
      const valueEnd = this.findValueEnd(content, i);
      const value = content.slice(i, valueEnd).trim();
      if (value) {
        tokens.push({ type: 'value', value });
      }
      i = valueEnd;

      // Skip comma
      while (i < content.length && /[\s,]/.test(content[i])) {
        i++;
      }
    }

    return tokens;
  }

  private findMatchingBrace(content: string, start: number): number {
    let depth = 0;
    let inString = false;
    let stringChar = '';

    for (let i = start; i < content.length; i++) {
      const char = content[i];

      if (!inString && (char === '"' || char === "'")) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar) {
        inString = false;
      } else if (!inString) {
        if (char === '{') {
          depth++;
        } else if (char === '}') {
          depth--;
          if (depth === 0) {
            return i;
          }
        }
      }
    }

    return content.length - 1;
  }

  private findAssignment(content: string, start: number): {key: string, value: string, endIndex: number} | null {
    let i = start;

    // Find the key (everything before =)
    const keyStart = i;
    while (i < content.length && content[i] !== '=' && content[i] !== ',') {
      if (content[i] === '{') {
        // If we hit a brace before =, this is not an assignment
        return null;
      }
      i++;
    }

    if (i >= content.length || content[i] !== '=') {
      return null;
    }

    const key = content.slice(keyStart, i).trim();
    i++; // Skip =

    // Skip whitespace after =
    while (i < content.length && /\s/.test(content[i])) {
      i++;
    }

    // Find the value
    const valueStart = i;
    let valueEnd: number;

    if (content[i] === '{') {
      // Value is a table
      valueEnd = this.findMatchingBrace(content, i) + 1;
    } else {
      // Value is a simple value
      valueEnd = this.findValueEnd(content, i);
    }

    const value = content.slice(valueStart, valueEnd).trim();

    return {
      key,
      value,
      endIndex: valueEnd
    };
  }

  private findValueEnd(content: string, start: number): number {
    let i = start;
    let inString = false;
    let stringChar = '';

    while (i < content.length) {
      const char = content[i];

      if (!inString && (char === '"' || char === "'")) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar) {
        inString = false;
      } else if (!inString && char === ',') {
        break;
      }

      i++;
    }

    return i;
  }

  private parseTokenValue(value: string): any {
    const trimmed = value.trim();

    // Handle table values
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      return this.createLuaTable(this.parseTableContent(trimmed));
    }

    // Handle simple values
    return this.parseSimpleValue(trimmed);
  }

  private parseSimpleValue(value: string): any {
    if (!value) return "";

    // String values
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      return value.slice(1, -1);
    }

    // Boolean values
    if (value === "true") return true;
    if (value === "false") return false;
    if (value === "nil") return null;

    // Number values
    if (!isNaN(Number(value))) {
      return Number(value);
    }

    // Default to string (for identifiers, etc.)
    return value;
  }

  private createLuaTable(obj: any): LuaTable {
    const luaTable = obj as LuaTable;
    const parser = this;

    // Following C# NLua pattern: getValues returns array of all values
    luaTable.getValues = function<T>(): T[] {
      const values = Object.values(this).filter(v => typeof v !== 'function');
      return values as T[];
    };

    // Following C# NLua pattern: getValue for key-based access
    luaTable.getValue = function<T>(key: string): T | undefined {
      const value = this[key];
      return value as T;
    };

    // Convenience method with default value
    luaTable.getValueOrDefault = function<T>(key: string, defaultValue: T): T {
      const value = this[key];
      return value !== undefined ? value as T : defaultValue;
    };

    return luaTable;
  }
}