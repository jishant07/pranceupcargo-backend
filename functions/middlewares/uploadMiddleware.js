const Busboy = require('busboy');
const helperModel = require('../models/globalModel')
const os = require('os')
const path = require('path')
const fs = require('fs')

const busboymiddleware = (req, res, next) =>{
    const busboy = Busboy({headers:req.headers})
    fields = {};
    files = [];
    fileWrites = [];
    busboy.on("field", (key, value) => {
      fields[key] = value;
    });
    req.body = fields;
    const tmpdir = os.tmpdir();
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      filename = helperModel.randomFileNameGen() + filename.filename;
      const filepath = path.join(tmpdir, filename);
      const writeStream = fs.createWriteStream(filepath);
      file.pipe(writeStream);
  
      fileWrites.push(new Promise((resolve, reject) => {
        file.on("end", () => writeStream.end());
        writeStream.on("finish", () => {
          fs.readFile(filepath, (err, buffer) => {
            const size = Buffer.byteLength(buffer);
            if (err) {
              return reject(err);
            }
  
            files.push({
              fieldname,
              filepath,
              originalname: filename,
              encoding,
              mimetype,
              buffer,
              size,
            });
  
            try {
              fs.unlinkSync(filepath);
            } catch (error) {
              return reject(error);
            }
  
            resolve();
          });
        });
        writeStream.on("error", reject);
      }));
    });
  
    busboy.on("finish", () => {
      Promise.all(fileWrites)
          .then(() => {
            req.body = fields;
            req.files = files;
            next();
          })
          .catch(next);
    });
    busboy.end(req.rawBody);
  };

  module.exports = busboymiddleware