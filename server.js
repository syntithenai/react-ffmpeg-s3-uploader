const express = require('express')
const bodyParser= require('body-parser')
const app = express()
var config=require('./config')
var request = require('request')
var fs = require('fs')
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var router = express.Router();
router.get('/proxy', (req, res) => {
    if (req.query.url) {
        request.get(req.query.url).pipe(res);
    }
});

router.use('/s3', require('./s3router')({
    bucket: config.s3Bucket,
    region: config.s3Region, //optional
    //signatureVersion: 'v4', //optional (use for some amazon regions: frankfurt and others)
    headers: {'Access-Control-Allow-Origin': '*'}, // optional
    ACL: 'private', // this is default
    uniquePrefix: false // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
}));

router.get('/worker', (req, res) => {
    if (req.query && req.query.worker) {
        let workerPath = path.join(__dirname, './workers/ffmpeg-'+req.query.worker+".js");
        if (fs.existsSync(workerPath)) {
            res.sendFile(workerPath);
        }
        
    }
});

app.use('/uploader',router)


const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
