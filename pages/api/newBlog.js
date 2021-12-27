import { MongoClient } from "mongodb";
import moment from "moment";
import formidable from "formidable";
import * as path from "path";
import * as fs from "fs";
const slugify = require("slugify");

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  if (req.method === "POST") {
    // const data = req.body;

    const timestamp = moment().format("DD-MM-YYYY");

    fs.mkdir(`./public/static/${timestamp}`, { recursive: true }, (err) => {
      return console.log(err);
    });
    const form = formidable({
      multiple: true,
      uploadDir: `./public/static/${timestamp}`,
    });
    form.keepExtensions = true;
    form.keepFilenames = true;

    const data = await new Promise((resolve, reject) => {
      form
        .on("fileBegin", function (_, file) {
          const thePath = path.posix.join(
            `./public/static/${timestamp}`,
            slugify(file.originalFilename)
          );
          file.path = thePath;
        })
        .on("error", function (err) {
          throw err;
        })

        .on("field", function (field, value) {
          //receive form fields here
        })

        .on("file", function (field, file) {
          //On file received
          let oldName = path.posix.join(
            `./public/static/${timestamp}`,
            file.newFilename
          );
          let newName = path.posix.join(
            `./public/static/${timestamp}`,
            file.originalFilename
          );
          console.log(oldName, newName);
          fs.rename(oldName, newName, () => console.log("File renamed"));
        })

        .on("progress", function (bytesReceived, bytesExpected) {
          //self.emit('progess', bytesReceived, bytesExpected)

          const percent = ((bytesReceived / bytesExpected) * 100) | 0;
          console.log("Uploading: %" + percent);
        })

        .on("end", function () {});

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({
          fields: fields,
          files: files,
        });
      });
    });

    const client = await MongoClient.connect(
      "mongodb+srv://ying285:Klkmo123@cluster0.cd8mj.mongodb.net/alisablog?retryWrites=true&w=majority"
    );
    const db = client.db();
    const alisablogCollection = db.collection("alisablog");
    const result = await alisablogCollection.insertOne({
      ...data.fields,
      image: path.posix.join(
        `/static/${timestamp}`,
        data.files.image.originalFilename
      ),
    });
    console.log(result);
    client.close();
    res.status(201).json({ message: "new blog", data });
  }
}

export default handler;
