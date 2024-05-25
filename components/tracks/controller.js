const { dowloader } = require("../../dowloader.js");
const utils = require("../../utils.js");
const fs = require("fs");
const path = require("path");

async function getTrack(id) {
  try {
    let filePath = await utils.isExist(id);

    if (!filePath) {
      filePath = await dowloader(id);
    }
    
    return filePath;
  } catch (e) {
    console.log(e);
  }
}
async function musicLoader(dirPath, req, res) {
  try {
    console.log(dirPath);
    let files = await utils.fsReadDirAsync(dirPath);
    const fileName = files.find((el) => el.includes(".mp3"));
    console.log(dirPath);
    console.log(files);
    console.log(fileName);
    const filePath = path.join(dirPath, fileName);

    const range = req.headers.range;
    const audioStat = fs.statSync(filePath);
    const fileSize = audioStat.size;

    let start = 0;
    let end = fileSize - 1;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      start = parseInt(parts[0], 10);
      end = parts[1] ? parseInt(parts[1], 10) : end;
    }

    const chunksize = (end - start) + 1;
    const audioStream = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mpeg",
    });

    audioStream.pipe(res);

  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getTrack, musicLoader };
