import { parseFFMetadata } from './parse';
import { SPECIAL_CHARACTERS, writeFFMetadata } from './write';
/**
 * Characters used to indicate comments in the metadata file.
 */
declare const COMMENT_CHARACTERS: string[];
/**
 * The header string for FFMETADATA1.
 */
declare const HEADER = ";FFMETADATA1\n";
export { parseFFMetadata, writeFFMetadata, SPECIAL_CHARACTERS, HEADER, COMMENT_CHARACTERS };
