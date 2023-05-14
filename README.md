# FFMETADATA1 Parser

A utility module for parsing and writing FFMETADATA1 files.

## Installation

```shell
npm install ffmetadata1
```

## Usage

```javascript
const { parseFFMetadata, writeFFMetadata } = require('ffmetadata1');

// Example: Parsing FFMETADATA1 from a file
parseFFMetadata('metadata.txt')
  .then((metadata) => {
    console.log(metadata);
  })
  .catch((error) => {
    console.error('Error parsing FFMETADATA1:', error);
  });

// Example: Writing FFMETADATA1 to a file
const metadata = {
  'section1': {
    'key1': 'value1',
    'key2': 'value2'
  },
  'section2': [
    {
      'key3': 'value3'
    },
    {
      'key4': 'value4'
    }
  ]
};

writeFFMetadata(metadata, 'output.txt')
  .then(() => {
    console.log('FFMETADATA1 file written successfully.');
  })
  .catch((error) => {
    console.error('Error writing FFMETADATA1:', error);
  });
```

## API

### `parseFFMetadata(filePath?: string): Promise<object>`

Parses FFMETADATA1 from a file or stdin and returns the parsed metadata object.

- `filePath` (optional): The path to the metadata file. If not provided, stdin will be used.

Returns a promise that resolves to the parsed metadata object.

```javascript
const { parseFFMetadata } = require('ffmetadata1');

parseFFMetadata('metadata.txt')
  .then((metadata) => {
    console.log(metadata);
  })
  .catch((error) => {
    console.error('Error parsing FFMETADATA1:', error);
  });
```

### `writeFFMetadata(metadata: object, filePath?: string): Promise<void | string>`

Writes FFMETADATA1 from the provided metadata object to a file or stdout.

- `metadata`: The metadata object to write.
- `filePath` (optional): The path to the output file. If not provided, stdout will be used.

Returns a promise that resolves when the write operation is complete. If a `filePath` is provided, it resolves to `void`. Otherwise, it resolves to the generated metadata string.

```javascript
const { writeFFMetadata } = require('ffmetadata1');

const metadata = {
  'section1': {
    'key1': 'value1',
    'key2': 'value2'
  },
  'section2': [
    {
      'key3': 'value3'
    },
    {
      'key4': 'value4'
    }
  ]
};

writeFFMetadata(metadata, 'output.txt')
  .then(() => {
    console.log('FFMETADATA1 file written successfully.');
  })
  .catch((error) => {
    console.error('Error writing FFMETADATA1:', error);
  });
```

## License

```plain
Copyright 2023 Fredrick R. Brennan (★コピペ) <copypaste@kittens.ph>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
