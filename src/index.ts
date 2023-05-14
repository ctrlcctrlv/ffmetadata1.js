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

import { parseFFMetadata } from './parse';
import { SPECIAL_CHARACTERS, writeFFMetadata } from './write';

/**
 * Characters used to indicate comments in the metadata file.
 */
const COMMENT_CHARACTERS = ["#", ";"];

/**
 * The header string for FFMETADATA1.
 */
const HEADER = ";FFMETADATA1\n";


export { parseFFMetadata, writeFFMetadata, SPECIAL_CHARACTERS, HEADER, COMMENT_CHARACTERS };
