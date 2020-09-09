/**
 * The script transforms "phrases" pack text files into the structured json files.
 * 
 * Input dir: src/data
 * Output dir: public/data
 * 
 * Text files have specific structure. Each line starts with the phrase
 * and has a "$" delimiter for an author name.
 * 
 * JSON body has two fields: pack's name and array of phrases objects with a "body" and a "name" properties.
 * JSON's file names has a specific names: pack-{number_of_pack}.json.
 * 
 * Also, the script generates an exported by default array in public/map.js.
 * Index -> number of pack, value -> number of phrases within it.
 */

const { readFile, readdir, writeFile } = require("fs/promises");
const { join, resolve } = require("path");

const __dirname = resolve();

const INPUT_DIR = join(__dirname, "/src/data");
const OUTPUT_DIR = join(__dirname, "/public/data");

/**
 * Steps:
 * 
 * - The input directory should be read and each filename within it should be got.
 * - Validate if it's name is just a number and it has a txt extention.
 * - If validity is not proceeded, the file is skipped.
 * - Read the file.
 * - Break the data by lines.
 * - Each line is broken by "$" delimeter to get a [ body, author ] string tuple.
 * - Strings should be trimmed from whitespaces.
 * - The tuples are collected into the array.
 * - Serialize the JSON with pack number and phrases array fields.
 * - Write the file to the output dir as pack_{number_of_the_pack}.json.
 */

async function transformFiles() {
  let pack = 0; // pack number
  let map = []; // phrases map

  // read each file's name in the input dir
  for (const filename of await readdir(INPUT_DIR)) {
    // skip if not valid file
    if (validate(filename)) {
      const phrases = await processFile(filename);
      await writeProcessedFile(pack, phrases);
      pack++;
      map.push(phrases.length);
    }
  }

  await writeMap(map);
}

function validate(filename) {
  return /^\d+\.txt$/.test(filename);
}

async function processFile(filename) {
  try {
    const data = await readFile(join(INPUT_DIR, filename), {
      encoding: "utf-8"
    });

    // break file contents by lines
    const contents = data.split("\n");
    const phrases = [];
    
    for (let line of contents) {
      const [ body, author ] = line.split("$");

      if (!line.length || !body || !author) continue;

      phrases.push({
        body: body.trim(),
        author: author.trim()
      });
    }

    return phrases;
  } catch (error) {
    console.error(error);
  }  
}

async function writeProcessedFile(pack, phrases) {
  const json = JSON.stringify({
    pack,
    phrases
  });

  try {
    await writeFile(join(OUTPUT_DIR, `${pack}.json`), json, {
      encoding: "utf-8"
    });
  } catch (error) {
    console.error(error);
  }
}

async function writeMap(data) {
  const fileContents = `export default ${JSON.stringify(data)};`;

  try {
    await writeFile(join(OUTPUT_DIR, "map.js"), fileContents, {
      encoding: "utf-8"
    });
  } catch (error) {
    console.error(error);
  }
}

// run script
transformFiles();
