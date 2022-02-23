const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_SECRET_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

module.exports = function OneVideo(req, res) {
  const filename = req.params.filename;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
  };

  s3.getObject(params, (error, data) => {
    if (error) {
      res.status(500).send(error);
    }
    res.writeHead(200, { "Content-Type": "video/mp4" });
    res.write(data.Body, "binary");
    res.end(null, "binary");
  });
};
