/**
 * Special characters that need to be escaped in metadata values.
 */
export declare const SPECIAL_CHARACTERS: string[];
/**
 * Writes FFMETADATA1 from the provided metadata object to a file or stdout.
 * @param {object} metadata - The metadata object to write.
 * @param {string} [filePath] - The path to the output file. If not provided, stdout will be used.
 * @returns {Promise<void|string>} A promise that resolves when the write operation is complete. If a filePath is provided, it resolves to void. Otherwise, it resolves to the generated metadata string.
 */
export declare function writeFFMetadata(metadata: object, filePath?: string): Promise<void | string>;
