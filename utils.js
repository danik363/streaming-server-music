const { exec } = require('child_process');
const { promisify } = require('util');
const { readdir } = require('fs');
const execAsync = promisify(exec);
const fsReadDirAsync = promisify(readdir);
const __mainPath = __dirname;
module.exports = {execAsync, fsReadDirAsync, __mainPath};
