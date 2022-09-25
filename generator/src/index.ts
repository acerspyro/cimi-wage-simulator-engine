import { parse } from "csv-parse";
import * as path from "path";
import * as fs from "fs";
import { csvDataToJsonConverter } from "./converters/csvDataToJson.converter";
import { DataPoint } from "./models/data.model";
import { fileURLToPath } from "url";

const CURRENT_DIR = path.dirname(fileURLToPath(import.meta.url));

const INPUT_DIR = path.join(CURRENT_DIR, "../input");
const OUTPUT_DIR = path.join(CURRENT_DIR, "../output");
const CSV_EXTENSION = /^(.*)(\.csv)$/;

/* Use to specify offset due to human-readable descriptions in the document */
const DATA_OFFSET = [0, 0] as DataPoint;
const HEAD_COUNT = [3, 2] as DataPoint;

fs.promises
  .readdir(INPUT_DIR)
  .then((dirContents) => {
    dirContents.forEach((filename) => {
      const fileContents = fs.readFileSync(path.join(INPUT_DIR, filename));
      const writePath = path.join(
        OUTPUT_DIR,
        filename.replace(CSV_EXTENSION, "$1.json")
      );

      parse(fileContents, {}, (err, records) => {
        if (err) {
          return console.error(`Error while parsing file ${filename}: ${err}`);
        }

        fs.promises
          .writeFile(
            writePath,
            JSON.stringify(
              csvDataToJsonConverter(records, DATA_OFFSET, HEAD_COUNT)
            )
          )
          .catch((err) =>
            console.error(
              `An error occured while writing file "${writePath}".\n  Error: ${err}`
            )
          );
      });
    });
  })
  .catch((err) =>
    console.error(
      `An error occured while reading files in "${INPUT_DIR}".\n  Error: ${err}`
    )
  );
