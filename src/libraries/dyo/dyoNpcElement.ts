import { BinaryStream } from "../binaryStream";
import { DyoElement } from "./dyoElement";

export class DyoNpcElement extends DyoElement {
    public name: string;
    public dialogName: string;
    public characterKey: string;
    public belligerence: number;
    public extraFlag: number;

    public read(streamReader: BinaryStream): void {
        super.read(streamReader);

        this.name = this.convertToString(streamReader.readBytes(64));
        this.dialogName = this.convertToString(streamReader.readBytes(32));
        this.characterKey = this.convertToString(streamReader.readBytes(32));
        this.belligerence = streamReader.readInt32();
        this.extraFlag = streamReader.readInt32();
    }

    private convertToString(buffer: Buffer): string {
        const nullTerminatorIndex = buffer.indexOf(0);
        if (nullTerminatorIndex !== -1) {
            return buffer.toString('utf8', 0, nullTerminatorIndex);
        } else {
            return buffer.toString('utf8');
        }
    }
}
