const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

const uploadFile = (file) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: Date.now() + file.name,
        Body:Buffer.from(file.image),
        ACL: "public-read-write",
        ContentType:file.type
    };
    return s3.upload(params).promise().then((res)=>res.Location).catch((e)=> console.log(e));
};
const deletFile = (fileName) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
    };

    // Uploading files to the bucket
    s3.deleteObject(params, function (err, data) {
        if (err) {
            throw err;
        }
        console.log(`File delet successfully`);
    });
};
module.exports = { deletFile, uploadFile }