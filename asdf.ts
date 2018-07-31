import * as yaml from "js-yaml";
import * as argparse from "argparse";


const cli = new argparse.ArgumentParser({
    prog:     'js-asdf',
    version:  require('./package.json'),
    addHelp:  true
});

var options = cli.parseArgs();
