import { readFile, readdir, stat, writeFile } from "fs/promises";
import { join, resolve } from "path";

const __dirname = resolve();

// where is new phrases packs are located
const PATH_FILES = join(__dirname, "/public/data/categories");
// processed dir
const PATH_DATA = join(__dirname, "/public/data");
const FILE_NAME = "metadata.js";

/**
 * Reads a directory and returns names of child directories and number of files inside of them. 
 * @param {string} [path] - Path
 * @returns {string[]} Array of arrays with directory name and number of assosiated files. 
 */
const dirs = async (path = PATH_FILES) => {
  let map = [];

  for (const dir of await readdir(path)) {
    if ((await stat(join(path, dir))).isDirectory()) {
      const packs = [];
      const dirpath = join(path, dir);

      for (const file of await readdir(dirpath)) {
        const data = await readFile(join(dirpath, file));
        const { phrases } = JSON.parse(data);
        packs.push(phrases.length);
      }

      // directory name is category
      map.push([ dir, packs ]);
    }
  }

  return map;
}

/**
 * Writes metadata to the file.
 * @param {string} path 
 */
const writeMetaData = async (path = PATH_DATA) => {
  const meta = await dirs();

  const body = `export default new Map(${JSON.stringify(meta, null, 2)});`;

  await writeFile(join(PATH_DATA, FILE_NAME ), body, {
    encoding: "utf-8"
  });
}

writeMetaData();
