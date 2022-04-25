import fs from "fs";

export type Task = {
  name: string;
  start: number;
  end: number;
  isWholeDayTask: boolean;
};

export type SavedTask = Task & {
  id: number;
};

export type schema = {
  tasks: SavedTask[];
};

const dbPath = "./services/db.json";

const readFile = (): schema => {
  const schema: schema = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
  return schema;
};

const writeFile = (schema: schema) => {
  fs.writeFileSync(dbPath, JSON.stringify(schema), "utf-8");
};

export const create = (task: Task): SavedTask => {
  const schema = readFile();
  const id = Date.now() + Math.random() * 1000;
  const taskToSave:SavedTask = { id, ...task };
  schema.tasks.push(taskToSave);
  writeFile(schema);
  return taskToSave;
};

export const read = (id: string) => {};

export const readAll = (): schema => {
  return readFile();
};

export const update = (task: SavedTask) => {};

export const remove = (id: string) => {};
