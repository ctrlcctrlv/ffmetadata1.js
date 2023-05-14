const fs = require("fs");
const chai = require("chai");
const { parseFFMetadata, writeFFMetadata } = require("../dist/index");

const expect = chai.expect;

describe("ffmpeg-formats.texi example", () => {
  var TEST_FILE_PATH = "test/data/ffmpeg_docs_example.in";
  var EXPECTED_OUTPUT_PATH = "test/data/ffmpeg_docs_example.out.json";
  var TEST_OUTPUT_PATH = "test/data/ffmpeg_docs_example.actual.json";
  var EXPECTED_OUTPUT;

  before(() => {
    EXPECTED_OUTPUT = JSON.parse(fs.readFileSync(EXPECTED_OUTPUT_PATH));
  });

  it("should parse the metadata correctly", async () => {
    const result = await parseFFMetadata(TEST_FILE_PATH);
    expect(result).to.deep.equal(EXPECTED_OUTPUT);
  });

  it("should write the metadata correctly", async () => {
    await writeFFMetadata(EXPECTED_OUTPUT, TEST_OUTPUT_PATH);
    const result = await parseFFMetadata(TEST_OUTPUT_PATH);
    expect(result).to.deep.equal(EXPECTED_OUTPUT);
  });
});

describe("multichapter example", () => {
  var TEST_FILE_PATH = "test/data/multichapter.in";
  var EXPECTED_OUTPUT_PATH = "test/data/multichapter.out.json";
  var TEST_OUTPUT_PATH = "test/data/multichapter.actual.json";
  var EXPECTED_OUTPUT;

  before(() => {
    EXPECTED_OUTPUT = JSON.parse(
      fs.readFileSync(EXPECTED_OUTPUT_PATH).toString()
    );
  });

  it("should parse the metadata correctly", async () => {
    const result = await parseFFMetadata(TEST_FILE_PATH);
    expect(result).to.deep.equal(EXPECTED_OUTPUT);
  });

  it("should write the metadata correctly", async () => {
    await writeFFMetadata(EXPECTED_OUTPUT, TEST_OUTPUT_PATH);
    const result = await parseFFMetadata(TEST_OUTPUT_PATH);
    expect(result).to.deep.equal(EXPECTED_OUTPUT);
  });
});
