import fs from "fs";
import path from "path";
import _ from "lodash";
import yaml from "js-yaml";

// Read the file content
fs.readFile(
  path.join(__dirname, "../data", "accessory.inc"),
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Initialize an empty array to store the parsed data
    const parsedData: { id: string; levels: [string, number][] }[] = [];

    // Split the content into sections based on the accessory name
    const sections = data.split(/(?=II_)/);

    // Process each section
    sections.forEach((section) => {
      // Skip empty sections
      if (!section.trim()) {
        return;
      }

      // Split the section into lines
      const lines = section.trim().split("\n");

      // Get the accessory id from the first line
      const accessoryId = lines
        .shift()!
        .trim()
        .split("\t")
        .shift()!
        .split(" ")
        .shift()!;

      // Initialize an empty array to store the accessory levels
      let levels: any = [];

      // Process each line
      lines.forEach((line) => {
        // Skip lines that contain only opening or closing braces
        if (line.trim() === "{" || line.trim() === "}" || line.trim() === "") {
          return;
        }
        // Split the line into key-value pairs
        const [level, value] = line.trim().split("{");
        // // Parse the value into attribute and value

        if (!value) return;
        const [attributes, __] = value.trim().split("}");
        if (!attributes.length) return;
        const attributePair = _.chunk(attributes.trim().split("\t"), 2);
        // // Add the parsed value to the current level
        levels.push({
          level: parseInt(level.trim()),
          attributes: attributePair.map((i) => ({
            id: i[0],
            value: parseInt(i[1])
          })),
        });
      });

      // Add the accessory data to the parsed data array
      parsedData.push({ id: accessoryId, levels });
    });

    // Filter out only parts starting with "II_"
    const filteredData = parsedData.filter((item) => item.id.startsWith("II_"));

    // Log the filtered data
    const yamlData: string = yaml.dump(filteredData);

    // Write YAML data to output file
    fs.writeFile(
      path.join(__dirname, "../custom", "accessory.yaml"),
      yamlData,
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Conversion completed. Output written to accessory.yaml");
      }
    );
  }
);
