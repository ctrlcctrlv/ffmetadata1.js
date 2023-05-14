import * as fs from "fs";

/**
 * Special characters that need to be escaped in metadata values.
 */
export const SPECIAL_CHARACTERS = ["=", ";", "#", "\\", "\n"];

/**
 * Escapes special characters in a string.
 * @param {string} string - The string to escape.
 * @returns {string} The escaped string.
 */
function escapeSpecialCharacters(string: string): string {
  let escapedString = "";
  for (let char of string) {
    if (SPECIAL_CHARACTERS.includes(char)) {
      escapedString += "\\" + char;
    } else {
      escapedString += char;
    }
  }
  return escapedString;
}


/**
 * Writes FFMETADATA1 from the provided metadata object to a file or stdout.
 * @param {object} metadata - The metadata object to write.
 * @param {string} [filePath] - The path to the output file. If not provided, stdout will be used.
 * @returns {Promise<void|string>} A promise that resolves when the write operation is complete. If a filePath is provided, it resolves to void. Otherwise, it resolves to the generated metadata string.
 */
export async function writeFFMetadata(
  metadata: object,
  filePath?: string
): Promise<void | string> {
  let fileStream: fs.WriteStream | (NodeJS.WriteStream & { fd: 1 });
  let result = "";

  if (filePath) {
    fileStream = fs.createWriteStream(filePath);
  } else {
    fileStream = process.stdout;
  }

  for (const [key, value] of Object.entries(metadata)) {
    let stream: any = fileStream;
    if (Array.isArray(value)) {
      // Handle section arrays
      for (const section of value) {
        stream.write(`[${key}]\n`);
        for (const [sectionKey, sectionValue] of Object.entries(section)) {
          stream.write(
            `${escapeSpecialCharacters(sectionKey)}=${escapeSpecialCharacters(
              sectionValue as string
            )}\n`
          );
        }
      }
    } else if (typeof value === "object") {
      // Handle single sections
      stream.write(`[${key}]\n`);
      for (const [sectionKey, sectionValue] of Object.entries(value)) {
        stream.write(
          `${escapeSpecialCharacters(sectionKey)}=${escapeSpecialCharacters(
            sectionValue as string
          )}\n`
        );
      }
    } else {
      // Handle global metadata
      stream.write(
        `${escapeSpecialCharacters(key)}=${escapeSpecialCharacters(value)}\n`
      );
    }
  }

  if (!filePath) {
    fileStream.end();
    return result;
  }

  return new Promise<void>((resolve, reject) => {
    fileStream.on("finish", () => {
      resolve();
    });
    fileStream.on("error", (error) => {
      reject(error);
    });
    fileStream.end();
  });
}
