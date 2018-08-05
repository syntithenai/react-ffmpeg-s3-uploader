import React, { Component } from 'react';
//let MediaFileUpload=import('react-ffmpeg-s3-uploader')
import MediaFileUpload from './MediaFileUpload';

class App extends Component {
    

    
    componentDidMount() {
        
        
    };
              
    render() {
    return (
      <div className="App">
      <a href="https://github.com/syntithenai/react-ffmpeg-s3-uploader"><img style={{position: 'absolute',top: 0,right: 0,border: 0}} src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png" alt="Fork me on GitHub" /></a>
      <h1>Transcoding File Uploader Demo</h1>
      <div>
      Select a file to transcode and upload to Amazon S3.
      
      </div>
      
      <br/>
      <hr/>
        <MediaFileUpload
            publicUrlPrefix="/uploader"
            signingUrl="/uploader/s3/sign"
            s3path="mediafiles/"
            onFinish={this.finishUploadMedia}
        />
        <hr/>
        <br/>
      <div>
      Multiple files are created to ensure media formats for all web platforms. <br/>
      All the transcoding is done by the browser client and the file is uploaded directly to Amazon S3 to minimise load and network bandwidth on your server.
      <ul>
        <li>Audio Files are transcoded to webm audio, mp3 and mp3 low quality (for google home and alexa).</li>
        <li>Video Files are transcoded to mp4 and webm video.</li>
        <li>Image Files are transcoded to png.</li>
      </ul>
      See the javascript console for the final callback with amazon urls.
      <hr/>
      </div>
        <div>
        <br/><br/>
        Another open source project supported by the team at <br/>
        <a href='https://mnemolibrary.com' ><img src='/mnemoicon-100.png' /><br/>Mnemo's Library</a>
        <a href='https://github.com/syntithenai/mnemolibrary' ><img src='/GitHub.jpg' width="50px" /></a>
        
        <br/><br/>
        Based on <br/>
        <a href='https://github.com/odysseyscience/react-s3-uploader'>react-s3-uploader</a><br/>
        Using <br/>
        <a href='http://bgrins.github.io/videoconverter.js/'>browser based transcoder</a><br/>
        <a href='https://github.com/Kagami/ffmpeg.js'>kagami mp3/mp4 codecs</a><br/>
        
        </div>
      </div>
    );
  }
  
  finishUploadMedia(result) {
      console.log(["LAST FINISHED upload",result]);
  };  
  
}

// can be used to munge base filename
//            scrubFilename={(filename) => "media_"+String(this.props.question._id)}
// limit filetypes
//            accept="audio/*,video/*,image/*"
            //signingUrlMethod="GET"
            //autoUpload={true}
            //signingUrlWithCredentials={ true }   
            //uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}  
            //contentDisposition="auto"
            // currentMedia={currentMedia}  // array of existing values
       
            
export default App;
