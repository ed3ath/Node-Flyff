import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import _ from "lodash";

fs.readFile(
  path.join(__dirname, "../data", "expTable.inc"),
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const parsedData: any[] = [];

    const sections = data.split(/(?=exp)/);

    sections.forEach((section) => {
      if (!section.trim() || section.startsWith("//")) {
        return;
      }

      if (section.startsWith("expCharacter")) {
        let level = 0
        const lines = section.split("\n").map(i => i.trim());
        lines.forEach((line) => {
            if (line === "{" || line === "}" || line.startsWith("//") || !line.trim()) return;
            const parts = line.split("\t").map(i => i.trim());
            if (parts[0] === '0' && parts[1] === '0' && parts[2] === '0') return
            if (parts.length < 4) return;
            parsedData.push({
                level,
                exp: parseFloat(parts[0]),
                pxp: parseFloat(parts[1]),
                gp: parseFloat(parts[2]),
                limitExp: parseFloat(parts[3]),
            })
            level++
        })
      }
    });

    const yamlData: string = yaml.dump(parsedData);

    // Write YAML data to output file
    fs.writeFile(
      path.join(__dirname, "../custom", "expCharacter.yaml"),
      yamlData,
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Conversion completed. Output written to expCharacter.yaml");
      }
    );
  }
);
