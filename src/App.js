import React, { Component } from 'react';
//let MediaFileUpload=import('react-ffmpeg-s3-uploader')
import MediaFileUpload from './MediaFileUpload';

class App extends Component {
    

    
    componentDidMount() {
        
        
    };
              
    render() {
    return (
      <div className="App">
        <MediaFileUpload
            publicUrlPrefix="/uploader"
            signingUrl="/uploader/s3/sign"
            s3path="mediafiles/"
            onFinish={this.finishUploadMedia}
        />
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
