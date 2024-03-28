import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import _ from "lodash";

fs.readFile(
  path.join(__dirname, "../data", "world.inc"),
  "utf16le",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const parsedData: any[] = [];

    const lines = data.split("\n").map(i => i.trim());
    lines.forEach((line) => {
        if (line === "(" || line === ")" || line.startsWith("//") || !line.trim()) return;
        const parts = line.trim().replace(/\s/g, "").split("\"").map(i => i.trim());
        if (parts[1] === "SetTitle" || parts[2] === "SetTitle") return
        if (parts.length < 2) return;
        parsedData.push({
            id: parts[0],
            name: parts[1]
        })
    })

    const yamlData: string = yaml.dump(parsedData);

    // Write YAML data to output file
    fs.writeFile(
      path.join(__dirname, "../custom", "world.yaml"),
      yamlData,
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Conversion completed. Output written to world.yaml");
      }
    );
  }
);
