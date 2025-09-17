import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import _ from "lodash";

// Read the file content
fs.readFile(
  path.join(__dirname, "../data", "character.inc"),
  "utf16le",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Initialize an empty array to store the parsed data
    const parsedData: any[] = [];

    // Split the content into sections based on the character name
    const sections = data.split(/\n(?=ma|npc_)/i);

    sections.forEach((section, i) => {
      // Skip empty sections and comment sections
      if (!section.trim() || section.startsWith("//")) {
        return;
      }
      // // Split the section into lines
      const lines = section.trim().split("\n");

      const characterId = lines
        .shift()!
        .trim()
        .split("\t")
        .shift()!
        .split(" ")
        .shift()!
        .split("//")
        .shift()!;

      let addMenu: any[] = [],
        addVendorItem: any[] = [],
        addVendorItem2: any[] = [],
        structure = "",
        setMusic = "",
        setImage = "",
        setOutput = false,
        dialog = "",
        setName = "",
        addVendorSlot: any[] = [],
        setVenderType: any = null,
        setBuffSkill: any[] = [];

        

      if (characterId.includes("elper")) {
        console.log(lines);
      }

      for (let i = 0; i < lines.length; i++) {
        const trimmedLine = lines[i].trim();
        if (trimmedLine.startsWith("//")) {
          continue;
        }
        if (trimmedLine.startsWith("AddMenu(")) {
          const addMenuValues = trimmedLine
            .split(")")
            .shift()!
            .split("(")
            .pop()!
            .trim();
          addMenu.push(addMenuValues);
        } else if (trimmedLine.startsWith("AddVendorSlot")) {
          const slotIndex = trimmedLine.split(",").shift()!.split(" ").pop()!;
          const slotName = lines[i + 1].trim();
          addVendorSlot.push({
            slot: parseInt(slotIndex),
            name: slotName,
          });
        } else if (
          trimmedLine.startsWith("AddVendorItem") ||
          trimmedLine.startsWith("AddVenderItem")
        ) {
          const values = trimmedLine
            .split("(")
            .pop()!
            .split(")")
            .shift()!
            .trim()
            .split(",")
            .map((i) => i.trim());
          addVendorItem?.push({
            slot: parseInt(values[0]),
            id: values[1],
            job: parseInt(values[2]),
            min: parseInt(values[3]),
            max: parseInt(values[4]),
            qty: parseInt(values[5]),
          });
        } else if (
          trimmedLine.startsWith("AddVenderItem2") ||
          trimmedLine.startsWith("AddVenderItem2")
        ) {
          const values = trimmedLine
            .split("(")
            .pop()!
            .split(")")
            .shift()!
            .trim()
            .split(",")
            .map((i) => i.trim());
          addVendorItem2.push({
            slot: parseInt(values[0]),
            id: values[1],
          });
        } else if (trimmedLine.startsWith("SetName")) {
          setName = lines[i + 2].trim();
        } else if (trimmedLine.startsWith("SetImage")) {
          setImage = lines[i + 2].trim();
        } else if (trimmedLine.startsWith("SetOutput")) {
          setOutput =
            trimmedLine.split("(").pop()!.split(")").shift()!.trim() === "true";
        } else if (trimmedLine.startsWith("m_szDialog")) {
          dialog = trimmedLine
            .split("=")
            .pop()!
            .split(";")
            .shift()!
            .replace('"', "")
            .trim();
        } else if (trimmedLine.startsWith("m_nStructure")) {
          structure = trimmedLine
            .split("=")
            .pop()!
            .split(";")
            .shift()!
            .trim();
        } else if (trimmedLine.startsWith("SetVenderType")) {
          setVenderType = trimmedLine.split("(").pop()!.split(")").shift()!.trim();
        } else if (trimmedLine.startsWith("SetBuffSkill")) {
          const values = trimmedLine
            .split("(")
            .pop()!
            .split(")")
            .shift()!
            .trim()
            .split(",")
            .map((i) => i.trim());
          setBuffSkill.push({
            id: values[0],
            level: parseInt(values[1]),
            minLevel: parseInt(values[2]),
            maxLevel: parseInt(values[3]),
            duration: parseInt(values[4]),
          });
        }
      }

      if (characterId) {
        parsedData.push({
          id: characterId,
          name: setName,
          vendorSlots: addVendorSlot,
          settings: {
            menu: addMenu,
            vendorType: setVenderType ?? '',
            vendorItems: addVendorItem,
            vendorItems2: addVendorItem2,
            structure,
            music: setMusic,
            image: setImage,
            output: setOutput,
            dialog,
            hasDialog: !!dialog,
            canBuff: setBuffSkill.length > 0,
            buffs: setBuffSkill
          }
        });
      }
    });

    const yamlData: string = yaml.dump(parsedData);

    // Write YAML data to output file
    fs.writeFile(
      path.join(__dirname, "../custom", "characters.yaml"),
      yamlData,
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Conversion completed. Output written to characters.yaml");
      }
    );
  }
);
