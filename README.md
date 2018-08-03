react-s3-uploader
===========================

Provides a `React` component that allows for crop of image/audio/video files then uploads to an S3 Bucket.

All the transcoding is done by the browser client and the file is uploaded directly to Amazon S3 to minimise server load and network bandwidth.

wavesurfer.js is used to show an audio/video timeline for cropping.

Multiple versions of the selected file are uploaded to Amazon S3.
For video file types, mp4 and webm video are created.
For audio file types, mp3 and webm audio are created.
Image files are uploaded as png.

Video transcoding is relatively slow but workable for files up to about 50MB.
Selected files must be cropped with audio limited to 90 seconds and video 20 seconds (as defaults)


Install
-----------
```
git clone https://github.com/syntithenai/react-ffmpeg-s3-uploader.git
npm install --save ./react-ffmpeg-s3-uploader
```

Quick Start
------------

Edit the run_example.sh file and update with your amazon key and secret.
Update CORS on your bucket as described below.

Start the example server
```
cd react-ffmpeg-s3-uploader
./run_example.sh
```

Component
------------
See App.js for an example

```
<MediaFileUpload
    publicUrlPrefix="/uploader"
    signingUrl="/uploader/s3/sign"
    s3path="mediafiles/"
    onFinish={this.finishUploadMedia}
/>
```

onFinish is called with an object containing public url's for each uploaded file




Adding routes
------------
See server.js for an example.
Three routes are required - proxy,s3 and worker.
If you map them to a sub path inside your application using a router as below, be sure to set publicUrlPrefix and signingUrl in the compontent to reflect your path.


```

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


```


AWS
------------

Ensure that the following environment variables are set
```
export AWS_ACCESS_KEY_ID=<YOUR ID HERE>
export AWS_SECRET_ACCESS_KEY=<YOUR SECRET HERE>
```

Ensure CORS configuration on your bucket includes an allowed origin for your host.
```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>http://localhost:3000</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>POST</AllowedMethod>
    <AllowedMethod>PUT</AllowedMethod>
    <AllowedMethod>DELETE</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

