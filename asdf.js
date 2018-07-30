#!/usr/bin/env node


'use strict';

var yaml = require('js-yaml');

var argparse = require('argparse');

var cli = new argparse.ArgumentParser({
  prog:     'js-asdf',
  version:  require('./package.json').version,
  addHelp:  true
});

var options = cli.parseArgs();
