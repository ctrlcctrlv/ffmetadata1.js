/**
 * Parses FFMETADATA1 from a file or stdin and returns the parsed metadata object.
 * @param {string} [filePath] - The path to the metadata file. If not provided, stdin will be used.
 * @returns {Promise<object>} A promise that resolves to the parsed metadata object.
 */
export declare function parseFFMetadata(filePath?: string): Promise<object>;
