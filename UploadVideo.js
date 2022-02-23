const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_SECRET_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

module.exports = function UploadVideo(req, res) {
  let myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `${uuidv4()}.${fileType}`,
    Body: req.file.buffer,
    ContentType: "video/mp4",
    ACL: "public-read",
  };

  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send(error);
    }

    res.status(200).send(data);
  });
};
