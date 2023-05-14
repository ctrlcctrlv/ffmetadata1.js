"use strict";
// Copyright 2023 Fredrick R. Brennan (★コピペ) <copypaste@kittens.ph>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMENT_CHARACTERS = exports.HEADER = exports.SPECIAL_CHARACTERS = exports.writeFFMetadata = exports.parseFFMetadata = void 0;
const parse_1 = require("./parse");
Object.defineProperty(exports, "parseFFMetadata", { enumerable: true, get: function () { return parse_1.parseFFMetadata; } });
const write_1 = require("./write");
Object.defineProperty(exports, "SPECIAL_CHARACTERS", { enumerable: true, get: function () { return write_1.SPECIAL_CHARACTERS; } });
Object.defineProperty(exports, "writeFFMetadata", { enumerable: true, get: function () { return write_1.writeFFMetadata; } });
/**
 * Characters used to indicate comments in the metadata file.
 */
const COMMENT_CHARACTERS = ["#", ";"];
exports.COMMENT_CHARACTERS = COMMENT_CHARACTERS;
/**
 * The header string for FFMETADATA1.
 */
const HEADER = ";FFMETADATA1\n";
exports.HEADER = HEADER;
