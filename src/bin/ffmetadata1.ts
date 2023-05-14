import { program } from "commander";
import { parseFFMetadata, writeFFMetadata } from "../index";

function printUsage() {
  console.log("Usage:");
  console.log("  ffmetadata1 [options] [input-file] [output-file]");
}

async function run() {
  program
    .name("ffmetadata1")
    .description("FFMETADATA1 Parser")
    .arguments("[input-file] [output-file]")
    .option("-o, --output <output-file>", "Specify the output file path")
    .on("-h, --help", () => {
      printUsage();
      process.exit(0);
    })
    .on("--help", () => {
      printUsage();
      console.log("");
      console.log("Examples:");
      console.log("  ffmetadata1 input.txt output.txt");
      console.log("  cat input.txt | ffmetadata1 -o output.txt");
      console.log("");
    })
    .parse(process.argv);

  if (program.args.length === 0 && !program.opts().output) {
    program.outputHelp();
    process.exit(0);
  }

  const inputFile = program.args[0];
  const outputFile = program.opts().output || program.args[1];

  try {
    const metadata = await parseFFMetadata(inputFile ? inputFile : undefined);
    console.log("Parsed metadata:", metadata);

    if (outputFile) {
      await writeFFMetadata(metadata, outputFile);
      console.log("FFMETADATA1 file written successfully to", outputFile);
    } else {
      console.log(
        "No output file provided. Use the -o or --output option to specify the output file path."
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
