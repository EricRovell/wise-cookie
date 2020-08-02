import { readFile, readdir, writeFile, mkdir, unlink } from "fs/promises";
import { join, resolve } from "path";

const __dirname = resolve();

// previously generated Map about categories and packs
import metadata from "../public/data/metadata.js";

// where is new phrases packs are located
const PATH_PHRASES = join(__dirname, "/public/data/raw");
// processed dir
const PATH_DATA = join(__dirname, "/public/data/categories");

/**
 * 1. Read directory with "raw" files.
 * 2. Each file's name is it's category
 *  - numbers can be added safely if there are several packs for same category
 *  - example: category_name123.txt -> category: category_name
 * 3. Check if this category is present:
 *  - YES: get how many packs are here by counting the files to provide a pack order.
 *  - NO: create a directory and assing the pack #0.
 * 4. We know the category name and the pack number. Begin processing the raw file:
 *  - Each line begins with phrase's body.
 *  - $ symbol separates the author name which is always present.
 *  - Each phrase: read line -> break by $-sign, trim strings.
 * 5. Category name, pack order, phrases array serialize as JSON.
 * 6. Write file to category dir as pack_{pack_number}.json.
 * 7. Delete the raw file.
 */

async function read() {
  // read each file
  for (const fileName of await readdir(PATH_PHRASES)) {
    // get category name by removing the extention
    const category = fileName.slice(0, -4);

    // get the pack order from metadata file
    const packNumber = (metadata.has(category))
      ? metadata.get(category).length
      : 0;

    console.log(packNumber);
    
    // create a dir for category if not present in map yet
    if (!metadata.has(category)) {
      await mkdir(join(PATH_DATA, category.toLowerCase()));
    }

    // read file
    const data = await readFile(join(PATH_PHRASES, fileName), {
      encoding: "utf-8"
    });
    
    // process file data
    const phrases = data
      .split("\n")
      .map(line => {
        const [ body, author ] = line.split("$");
        return {
          body: body.trim(),
          author: author.trim()
        };
      });

    // serialize
    const json = JSON.stringify({
      category,
      pack: packNumber,
      phrases
    });
    
    // write json file
    await writeFile(join(PATH_DATA, category.toLowerCase(), `pack_${packNumber}.json`), json, {
      encoding: "utf-8"
    });

    // delete processed file, it is not needed
    await unlink(join(PATH_PHRASES, fileName));
  }

  return true;
}

read();
