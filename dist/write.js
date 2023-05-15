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
exports.writeFFMetadata = exports.SPECIAL_CHARACTERS = void 0;
const fs = __importStar(require("fs"));
const _1 = require(".");
/**
 * Special characters that need to be escaped in metadata values.
 */
exports.SPECIAL_CHARACTERS = ["=", ";", "#", "\\", "\n"];
/**
 * Escapes special characters in a string.
 * @param {string} string - The string to escape.
 * @returns {string} The escaped string.
 */
function escapeSpecialCharacters(string) {
    let escapedString = "";
    for (let char of string) {
        if (exports.SPECIAL_CHARACTERS.includes(char)) {
            escapedString += "\\" + char;
        }
        else {
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
async function writeFFMetadata(metadata, filePath) {
    let fileStream;
    let result = "";
    if (filePath) {
        fileStream = fs.createWriteStream(filePath);
    }
    else {
        fileStream = process.stdout;
    }
    let stream = fileStream;
    stream.write(_1.HEADER);
    for (const [key, value] of Object.entries(metadata)) {
        if (Array.isArray(value)) {
            // Handle section arrays
            for (const section of value) {
                stream.write(`[${key}]\n`);
                for (const [sectionKey, sectionValue] of Object.entries(section)) {
                    stream.write(`${escapeSpecialCharacters(sectionKey)}=${escapeSpecialCharacters(sectionValue)}\n`);
                }
            }
        }
        else if (typeof value === "object") {
            // Handle single sections
            stream.write(`[${key}]\n`);
            for (const [sectionKey, sectionValue] of Object.entries(value)) {
                stream.write(`${escapeSpecialCharacters(sectionKey)}=${escapeSpecialCharacters(sectionValue)}\n`);
            }
        }
        else {
            // Handle global metadata
            stream.write(`${escapeSpecialCharacters(key)}=${escapeSpecialCharacters(value)}\n`);
        }
    }
    if (!filePath) {
        fileStream.end();
        return result;
    }
    return new Promise((resolve, reject) => {
        fileStream.on("finish", () => {
            resolve();
        });
        fileStream.on("error", (error) => {
            reject(error);
        });
        fileStream.end();
    });
}
exports.writeFFMetadata = writeFFMetadata;
