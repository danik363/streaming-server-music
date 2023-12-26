const { dowloader } = require("../../dowloader.js");
const utils = require("../../utils.js");
const fs = require("fs");
const stream = require("stream");
const path = require("path");
const { throws } = require("assert");

async function getTrack(id) {
  try {
    let filePath = await isExist(id);
    if (!filePath) {
      filePath = filePath = await dowloader(id);
    }
    return filePath;
  } catch (e) {
    console.log(e);
  }
}
async function isExist(id) {
  try {
    const elementsName = await utils.fsReadDirAsync(utils.__mainPath);
    console.log(elementsName);
    if (elementsName.some((el) => el.includes("music"))) {
      console.log(path.join(utils.__mainPath, "music"));
      const dirsPath = await utils.fsReadDirAsync(
        path.join(utils.__mainPath, "music")
      );
      console.log(dirsPath);
      const dirName = dirsPath.find((dir) => dir.includes(id));
      let dirPath;
      if(dirName){
        dirPath = path.join(utils.__mainPath, "music", dirName);
      }
      console.log(id);
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
async function musicLoader(dirPath, req, res) {
  try {
    let files = await utils.fsReadDirAsync(dirPath);
    const fileName = files.find((el) => el.includes(".mp3"));
    console.log(dirPath);
    console.log(files);
    console.log("hola");
    console.log(fileName);
    console.log(req.headers.range);
    const filePath = path.join(dirPath, fileName);
    const audioStream = fs.createReadStream(filePath);
    console.log('pase los filepath');

    audioStream.on('data',(chunk) => {
      console.log(chunk);
      res.write(chunk);
    });

    audioStream.on('end', ()=> {
      console.log('finish');
      res.end();
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = { getTrack, musicLoader };
