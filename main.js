require("dotenv/config");
const UploadVideo = require("./UploadVideo");
const DeleteVideo = require("./DeleteVideo");
const ListVideo = require("./ListVideo");
const OneVideo = require("./OneVideo");
const express = require("express");
const multer = require("multer");

const app = express();
const port = 3000;

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const upload = multer({ storage }).single("video");

app.post("/upload", upload, UploadVideo);
app.get("/list", upload, ListVideo);
app.get("/list/:filename", upload, OneVideo);

app.delete("/delete/:filename", upload, DeleteVideo);

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
}); 
