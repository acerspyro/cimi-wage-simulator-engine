import _ from "lodash";
import { X_AXIS, Y_AXIS } from "../models/const.model";
import { DataPoint } from "../models/data.model";

/**
 * Converts anything to camel case and cleans it up to remove anything not alphanumeric.
 * @param str String to convert to camel case
 * @returns Camel cased string
 */
function anyToCamelCase(str: string) {
  return _.camelCase(str).replace(/[^a-zA-Z0-9]+/g, "");
}

/**
 *
 * @param records Input records as a two-dimensional array
 * @param offset Specify data offset in x, y order (to allow for comments in the file)
 * @returns
 */
export function csvDataToJsonConverter(
  records: string[][],
  offset: DataPoint,
  headerCount: DataPoint
) {
  const isBeyondHeaders = (x: number, y: number) =>
    y >= headerCount[Y_AXIS] && x >= headerCount[X_AXIS];
  const isOnWeightName = (x: number, y: number) =>
    y + 1 === headerCount[Y_AXIS] && x >= headerCount[X_AXIS];

  const result = {};
  let weightNames = [] as string[];

  // Columns, then rows

  const getRecord = (x: number, y: number) => anyToCamelCase(records[y][x]);

  records.forEach((xAxisData, yOrigin) => {
    const y = yOrigin + offset[Y_AXIS];
    xAxisData.forEach((dataPoint, xOrigin) => {
      const x = xOrigin + offset[X_AXIS];

      if (isBeyondHeaders(x, y)) {
        // Add weights and key names
        let keyName = `${getRecord(x, 0)}.${getRecord(0, y)}`;

        // Append all extra X axis headers
        for (let i = 1; i < headerCount[X_AXIS]; i++) {
          const record = getRecord(i, y);
          keyName += record ? `.${record}` : "";
        }

        _.set(
          result,
          `${keyName}[${weightNames.indexOf(getRecord(x, 1))}]`,
          +dataPoint
        );
      } else if (isOnWeightName(x, y)) {
        // Generate weight names
        const record = getRecord(x, y);
        if (record !== "" && weightNames.indexOf(record) < 0) {
          weightNames.push(record);
        }
      }
    });
  });

  return result;
}
