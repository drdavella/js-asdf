import * as fs from "fs";
import * as yaml from "js-yaml";
import * as argparse from "argparse";


const cli = new argparse.ArgumentParser({
    prog:     'js-asdf',
    version:  require('./package.json'),
    addHelp:  true
});

cli.addArgument([ 'file' ], {
    help: 'ASDF file to read',
    nargs: '1',
});

const options = cli.parseArgs();
const filename = options.file[0] as string;


function parseAsdf(input: string) {

    /* Find the YAML end marker */
    var endIndex = input.indexOf('\n...\n');
    if (endIndex < 0) {
        throw "Unable to find YAML end marker";
    }

    var asdfString = input.slice(0, endIndex+4);
    var lines = asdfString.split('\n');

    if (lines[0].lastIndexOf('#ASDF', 0) !== 0) {
        throw new Error("Missing #ASDF header marker");
    }

    if (lines[1].lastIndexOf('#ASDF_STANDARD') !== 0) {
        throw new Error("Missing #ASDF_STANDARD header marker");
    }

    var yamlString = lines.slice(2).join('\n');
    var tree = yaml.safeDump(yamlString);

    return { tree: tree };
}

fs.readFile(filename, 'utf8', function(error, input) {

    if (error) {
        if (error.code === "ENOENT") {
            console.error("File not found: " + filename);
            process.exit(2);
        }

        console.error(
            options.trace && error.stack ||
            error.message ||
            String(error));

        process.exit(1);
    }

    var af = parseAsdf(input);
    console.log(af.tree);
});
