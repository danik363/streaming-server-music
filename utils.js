const { exec } = require('child_process');
const { promisify } = require('util');
const { readdir } = require('fs');
const execAsync = promisify(exec);
const path = require('path');
const fsReadDirAsync = promisify(readdir);
const __mainPath = __dirname;

async function isExist(id) {
  try {
    const elementsName = await fsReadDirAsync(__mainPath);
    console.log(elementsName);
    if (elementsName.some((el) => el.includes("music"))) {
      const dirsPath = await fsReadDirAsync(
        path.join(__mainPath, "music")
      );
      const dirName = dirsPath.find((dir) => dir.includes(id));
      let dirPath;
      if(dirName){
        dirPath = path.join(__mainPath, "music", dirName);
      }
      // const filesName = await utils.fsReadDirAsync(path.join(utils.__mainPath, 'music', dirPath));
      // console.log(filesName);
      // const fileName = filesName.find(file => file.includes('.mp3'));
      // console.log(fileName);
      // const filePath = path.join(utils.__mainPath, dirPath, fileName);

      return dirPath;
    }
    return "";
  } catch (error) {
    throw new Error("Hubo un error al verificar si existe el archivo", error);
  }
}

module.exports = {execAsync, fsReadDirAsync, __mainPath, isExist};
