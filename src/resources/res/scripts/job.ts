import fs from "fs";
import path from "path";
import _ from "lodash";
import yaml from "js-yaml";
import { DefineJob, JobMax, JobType } from "../../../common/defineJob";

// Read the file content
fs.readFile(
  path.join(__dirname, "../data", "propJob.inc"),
  "utf8",
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Initialize an empty array to store the parsed data
    const parsedData: any[] = [];

    const lines = data.split("\n");

    const jobsDefinitionData = fs.readFileSync(
      path.join(__dirname, "../custom/jobsDefinitions.yaml"),
      "utf-8"
    );
    const jobsDefinition: any = yaml.load(jobsDefinitionData);

    lines.forEach((line) => {
      if (line.startsWith("//")) {
        return;
      }

      if (!line.trim()) {
        return;
      }

      const parts = line.split("\t").map((i) => i.trim());

      parsedData.push({
        id: parts[0],
        attackSpeed: parseFloat(parts[1]),
        maxHpFactor: parseFloat(parts[2]),
        maxMpFactor: parseFloat(parts[3]),
        maxFpFactor: parseFloat(parts[4]),
        defenseFactor: parseFloat(parts[5]),
        hpRecoveryFactor: parseFloat(parts[6]),
        mpRecoveryFactor: parseFloat(parts[7]),
        fpRecoveryFactor: parseFloat(parts[8]),
        meleeSword: parseFloat(parts[9]),
        meleeAxe: parseFloat(parts[10]),
        meleeStaff: parseFloat(parts[11]),
        meleeStick: parseFloat(parts[12]),
        meleeKnuckle: parseFloat(parts[13]),
        magicWand: parseFloat(parts[14]),
        blocking: parseFloat(parts[15]),
        meleeYoyo: parseFloat(parts[16]),
        critical: parseFloat(parts[17]),
        type: jobsDefinition[parts[0]]?.Type,
        parent: jobsDefinition[parts[0]]?.Parent,
        minLevel: getMinLevel(getJobTypeId(jobsDefinition[parts[0]]?.Type)),
        maxLevel: getMaxLevel(getJobTypeId(jobsDefinition[parts[0]]?.Type)),
      });
    });

    function getJobTypeId(type: string) {
      return JobType[type];
    }

    function getMinLevel(type: JobType) {
      // console.log(type);
      switch (type) {
        case JobType.JTYPE_BASE:
          return 1;

        case JobType.JTYPE_EXPERT:
          return JobMax.MAX_JOB_LEVEL;

        case JobType.JTYPE_PRO:
          return JobMax.MAX_JOB_LEVEL + JobMax.MAX_EXP_LEVEL;

        case JobType.JTYPE_MASTER:
          return JobMax.MAX_JOB_LEVEL + JobMax.MAX_EXP_LEVEL;

        case JobType.JTYPE_HERO:
          return JobMax.MAX_GENERAL_LEVEL;

        case JobType.JTYPE_LEGEND_HERO:
          return JobMax.MAX_LEGEND_LEVEL;

        default:
          return JobMax.MAX_LEGEND_LEVEL;
      }
    }

    function getMaxLevel(type: JobType) {
      switch (type) {
        case JobType.JTYPE_BASE:
          return JobMax.MAX_JOB_LEVEL;

        case JobType.JTYPE_EXPERT:
          return JobMax.MAX_JOB_LEVEL + JobMax.MAX_EXP_LEVEL;

        case JobType.JTYPE_PRO:
          return JobMax.MAX_GENERAL_LEVEL;

        case JobType.JTYPE_MASTER:
          return JobMax.MAX_GENERAL_LEVEL;

        case JobType.JTYPE_HERO:
          return JobMax.MAX_LEGEND_LEVEL;

        case JobType.JTYPE_LEGEND_HERO:
          return JobMax.MAX_CHARACTER_LEVEL;

        default:
          return JobMax.MAX_CHARACTER_LEVEL;
      }
    }

    // Log the filtered data
    const yamlData: string = yaml.dump(parsedData);

    // Write YAML data to output file
    fs.writeFile(
      path.join(__dirname, "../custom", "job.yaml"),
      yamlData,
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Conversion completed. Output written to job.yaml");
      }
    );
  }
);
