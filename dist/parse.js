"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFFMetadata = void 0;
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
/**
 * Unescapes special characters in a string.
 * @param {string} string - The string to unescape.
 * @returns {string} The unescaped string.
 */
function unescapeSpecialCharacters(string) {
    return string.replace(/\\n/g, "\n").replace(/\\(.)/g, "$1");
}
/**
 * Parses FFMETADATA1 from a file or stdin and returns the parsed metadata object.
 * @param {string} [filePath] - The path to the metadata file. If not provided, stdin will be used.
 * @returns {Promise<object>} A promise that resolves to the parsed metadata object.
 */
async function parseFFMetadata(filePath) {
    let fileStream;
    if (filePath) {
        fileStream = fs.createReadStream(filePath);
    }
    else {
        fileStream = process.stdin;
    }
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    let metadata = {};
    let currentSection = null;
    let currentSectionName = null;
    let previousLineContinues = false;
    let key = null;
    let value = "";
    for await (const line of rl) {
        // If the previous line ended with a backslash, append the current line to the value
        if (previousLineContinues) {
            value += "\n" + line; // Add a newline character before the line
            (currentSection || metadata)[key] = unescapeSpecialCharacters(value);
            previousLineContinues = false;
            continue;
        }
        // New section
        if (line[0] === "[" && line[line.length - 1] === "]") {
            // If there is a current section, add it to the metadata before starting a new one
            if (currentSection && currentSectionName) {
                if (!metadata[currentSectionName]) {
                    metadata[currentSectionName] = [currentSection];
                }
                else {
                    metadata[currentSectionName].push(currentSection);
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
            }
            else {
                (currentSection || metadata)[key] = unescapeSpecialCharacters(value);
            }
        }
    }
    // If there is a current section at the end of the loop, add it to the metadata
    if (currentSection && currentSectionName) {
        if (!metadata[currentSectionName]) {
            metadata[currentSectionName] = [currentSection];
        }
        else if (Array.isArray(metadata[currentSectionName])) {
            metadata[currentSectionName].push(currentSection);
        }
        else {
            metadata[currentSectionName] = [
                metadata[currentSectionName],
                currentSection,
            ];
        }
    }
    return metadata;
}
exports.parseFFMetadata = parseFFMetadata;
