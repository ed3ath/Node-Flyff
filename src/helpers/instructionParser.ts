export interface Instruction {
  name: string;
  parameters: string[];
}

export interface Variable {
  name: string;
  value: string | number;
}

export interface Statement {
  type: 'instruction' | 'variable' | 'block';
}

export interface BlockStatement extends Statement {
  type: 'block';
  name: string;
  instructions: Instruction[];
  variables: Variable[];
  blocks: BlockStatement[];
}

export class InstructionParser {
  public static parseBlock(content: string): BlockStatement[] {
    const blocks: BlockStatement[] = [];
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    let currentBlock: BlockStatement | null = null;
    let braceLevel = 0;

    for (const line of lines) {
      if (line.includes('{')) {
        if (currentBlock === null) {
          const blockName = line.replace('{', '').trim();
          currentBlock = {
            type: 'block',
            name: blockName,
            instructions: [],
            variables: [],
            blocks: []
          };
        }
        braceLevel++;
      } else if (line.includes('}')) {
        braceLevel--;
        if (braceLevel === 0 && currentBlock) {
          blocks.push(currentBlock);
          currentBlock = null;
        }
      } else if (currentBlock && braceLevel === 1) {
        if (line.includes('(') && line.includes(')')) {
          const instruction = this.parseInstruction(line);
          if (instruction) {
            currentBlock.instructions.push(instruction);
          }
        } else if (line.includes('=')) {
          const variable = this.parseVariable(line);
          if (variable) {
            currentBlock.variables.push(variable);
          }
        }
      }
    }

    return blocks;
  }

  private static parseInstruction(line: string): Instruction | null {
    const match = line.match(/(\w+)\s*\((.*?)\)/);
    if (!match) return null;

    const name = match[1];
    const paramString = match[2];
    const parameters = paramString.split(',').map(p => p.trim().replace(/['"]/g, ''));

    return { name, parameters };
  }

  private static parseVariable(line: string): Variable | null {
    const parts = line.split('=');
    if (parts.length !== 2) return null;

    const name = parts[0].trim();
    const valueStr = parts[1].trim();
    let value: string | number = valueStr;

    if (!isNaN(Number(valueStr))) {
      value = Number(valueStr);
    }

    return { name, value };
  }
}