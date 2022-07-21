import stringify from "json-stringify-pretty-compact";
import { IJSONKifuFormat } from "json-kifu-format/dist/src/Formats";

let fileHandle: FileSystemFileHandle | null = null;

export class Api {
  static async fetchJKF() {
    [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const fileContents = await file.text();
    return JSON.parse(fileContents);
  }
  static async storeJKF(jkf: IJSONKifuFormat) {
    const body = stringify(jkf) + "\n"; // Add newline at end of file

    if (fileHandle == null) {
      fileHandle = await window.showSaveFilePicker({suggestedName: "kifu.jkf"});
    }

    const writable = await fileHandle.createWritable();
    await writable.write(body);
    await writable.close();
  }
}
