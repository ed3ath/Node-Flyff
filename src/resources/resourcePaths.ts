import path from "path";

const resPath = path.join(__dirname, "res");
export const ResourcePaths = {
  itemsProp: path.join(resPath, "data", "propItem.txt"),
  itemsText: path.join(resPath, "data", "propItem.txt.txt"),
  defineItem: path.join(resPath, "data", "defineItem.h"),
  defineItemKind: path.join(resPath, "data", "defineItemKind.h"),
  defineJob: path.join(resPath, "data", "defineJob.h"),
  moversProp: path.join(resPath, "data", "propMover.txt"),
  moversText: path.join(resPath, "data", "propMover.txt.txt"),
  moversEx: path.join(resPath, "custom", "propMoverEx.yaml"),
  defineObject: path.join(resPath, "data", "defineObj.h"),
  character: path.join(resPath, "custom", "characters.yaml"),
  characterText: path.join(resPath, "data", "character.txt.txt"),
  characterSchool: path.join(resPath, "custom", "characterSchool.yaml"),
  characterSchoolText: path.join(resPath, "data", "character-school.txt.txt"),
  dialogsDir: path.join(__dirname, "dialogs"),
  shopsDir: path.join(__dirname, "shops"),
  job: path.join(resPath, "custom", "job.yaml"),
  expCharacter: path.join(resPath, "custom", "expCharacter.yaml"),
  expDropLuck: path.join(resPath, "custom", "expDropLuck.yaml"),
  deathPenalty: path.join(resPath, "custom", "deathPenalty.yaml"),
};
