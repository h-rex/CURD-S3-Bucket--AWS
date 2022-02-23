// const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_SECRET_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

module.exports = function ListVideo(req, res) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
  };

  s3.listObjectsV2(params, (error, data) => {
    if (error) {
      res.status(500).send(error);
    }
    res.status(200).send(data.Contents.map(item => item.Key));
  });
};
