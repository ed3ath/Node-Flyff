import fs from "fs-extra";
import yaml from "js-yaml";
import path from "path";

// Read the input file
fs.readFile(
  path.join(__dirname, "data", "propMoverEx.inc"),
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Extract all sections
    const sections = data.split(/(?=MI_)/);

    // Initialize an array to store parsed sections
    const parsedSections: Record<string, any>[] = [];

    // Regular expression pattern to match section IDs dynamically
    const sectionIdPattern = /MI_\w+/;

    // Iterate over each section
    sections.forEach((section) => {
      // Extract the section ID
      const sectionIdMatch = section.match(sectionIdPattern);
      if (sectionIdMatch) {
        const sectionId = sectionIdMatch[0];

        // Initialize an object to store the parsed properties
        const parsedSection: Record<string, any> = {};
        parsedSection['id'] = sectionId;

        // Extract and format Maxitem property
        const maxitemMatch = section.match(/Maxitem\s*=\s*(\d+)/);
        if (maxitemMatch) {
          parsedSection['maxItem'] = parseInt(maxitemMatch[1]);
        }

        // Extract and format DropGold property
        const dropGoldMatch = section.match(/DropGold\((\d+),\s*(\d+)\);/);
        if (dropGoldMatch) {
          const minGold = parseInt(dropGoldMatch[1]);
          const maxGold = parseInt(dropGoldMatch[2]);
          parsedSection['dropGold'] = minGold === maxGold ? minGold : [minGold, maxGold];
        }

        // Extract and format DropKinds property
        const dropKindsMatches = section.matchAll(/DropKind\((\w+),\s*(\d+),\s*(\d+)\);/g);
        parsedSection['dropKinds'] = [];
        for (const match of dropKindsMatches) {
          parsedSection['dropKinds'].push({
            id: match[1],
            qty: [parseInt(match[2]), parseInt(match[3])]
          });
        }

        // Extract and format DropItems property
        const dropItemsMatches = section.matchAll(/DropItem\((\w+),\s*(\d+),\s*(\d+),\s*(\d+)\);/g);
        parsedSection['dropItems'] = [];
        for (const match of dropItemsMatches) {
          parsedSection['dropItems'].push({
            id: match[1],
            chance: parseFloat(match[2]) / 3000000000,
            qty: [parseInt(match[3]), parseInt(match[4])]
          });
        }

        // Push the parsed section to the array
        parsedSections.push(parsedSection);
      }
    });

    // console.log(parsedSections);

    // Convert parsedSections array to YAML format
    const yamlData: string = yaml.dump(parsedSections);

    // Write YAML data to output file
    fs.writeFile(path.join(__dirname, '../custom', 'propMoverEx.yaml'), yamlData, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Conversion completed. Output written to output.yaml');
    });
  }
);
