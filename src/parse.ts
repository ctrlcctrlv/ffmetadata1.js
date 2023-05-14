import * as fs from "fs";
import * as readline from "readline";

/**
 * Unescapes special characters in a string.
 * @param {string} string - The string to unescape.
 * @returns {string} The unescaped string.
 */
function unescapeSpecialCharacters(string: string): string {
  return string.replace(/\\n/g, "\n").replace(/\\(.)/g, "$1");
}

/**
 * Parses FFMETADATA1 from a file or stdin and returns the parsed metadata object.
 * @param {string} [filePath] - The path to the metadata file. If not provided, stdin will be used.
 * @returns {Promise<object>} A promise that resolves to the parsed metadata object.
 */
export async function parseFFMetadata(filePath?: string): Promise<object> {
  let fileStream: fs.ReadStream | (NodeJS.ReadStream & { fd: 0 });
  if (filePath) {
    fileStream = fs.createReadStream(filePath);
  } else {
    fileStream = process.stdin;
  }

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let metadata: Record<string, Record<string, any>[]> = {};
  let currentSection: Record<string, string> | null = null;
  let currentSectionName: string | null = null;
  let previousLineContinues = false;
  let key: string | null = null;
  let value = "";

  for await (const line of rl) {
    // If the previous line ended with a backslash, append the current line to the value
    if (previousLineContinues) {
      value += "\n" + line; // Add a newline character before the line
      (currentSection || metadata)[key!] = unescapeSpecialCharacters(value);
      previousLineContinues = false;
      continue;
    }

    // New section
    if (line[0] === "[" && line[line.length - 1] === "]") {
      // If there is a current section, add it to the metadata before starting a new one
      if (currentSection && currentSectionName) {
        if (!metadata[currentSectionName]) {
          metadata[currentSectionName] = [currentSection];
        } else {
          (metadata[currentSectionName] as Record<string, string>[]).push(
            currentSection
          );
        }
      }
      currentSectionName = line.slice(1, -1);
      currentSection = {};
      continue;
    }

    // Key-value pair
    const equalsIndex = line.indexOf("=");
    if (equalsIndex >= 0) {
      key = unescapeSpecialCharacters(line.slice(0, equalsIndex));
      value = line.slice(equalsIndex + 1);

      // Check if the line ends with a backslash, indicating a line continuation
      if (value[value.length - 1] === "\\") {
        value = value.slice(0, -1); // Remove the backslash
        previousLineContinues = true;
      } else {
        (currentSection || metadata)[key] = unescapeSpecialCharacters(value);
      }
    }
  }

  // If there is a current section at the end of the loop, add it to the metadata
  if (currentSection && currentSectionName) {
    if (!metadata[currentSectionName]) {
      metadata[currentSectionName] = [currentSection];
    } else if (Array.isArray(metadata[currentSectionName])) {
      metadata[currentSectionName].push(currentSection);
    } else {
      metadata[currentSectionName] = [
        metadata[currentSectionName],
        currentSection,
      ];
    }
  }

  return metadata;
}

