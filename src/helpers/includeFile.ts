import fs from "fs-extra";
import { Logger } from "./logger";
import { BlockStatement, InstructionParser, Instruction, Variable } from "./instructionParser";

export interface Block {
  name: string;
  unknownStatements: string[];
  getInstruction(name: string): Instruction | null;
  getInstructions(name: string): Instruction[];
  getVariable(name: string): Variable | null;
}

export class IncludeFile {
  private logger: Logger;
  private content: string;
  private blocks: Map<string, Block> = new Map();
  private statements: BlockStatement[] = [];

  constructor(filePath: string, separators: string = "([(){}=,;\\n\\r\\t ])") {
    this.logger = new Logger("IncludeFile");

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    this.content = fs.readFileSync(filePath, "utf-8");
    this.parseContent();
  }

  private parseContent(): void {
    this.statements = InstructionParser.parseBlock(this.content);

    for (const statement of this.statements) {
      const block: Block = {
        name: statement.name,
        unknownStatements: [],
        getInstruction: (name: string) => {
          return statement.instructions.find(i => i.name === name) || null;
        },
        getInstructions: (name: string) => {
          return statement.instructions.filter(i => i.name === name);
        },
        getVariable: (name: string) => {
          return statement.variables.find(v => v.name === name) || null;
        }
      };

      this.blocks.set(statement.name, block);
    }
  }

  public get Statements(): BlockStatement[] {
    return this.statements;
  }

  public getBlock(blockName: string): Block | null {
    return this.blocks.get(blockName) || null;
  }

  public dispose(): void {
    this.blocks.clear();
    this.statements = [];
  }
}