import React from 'react'
import ReactAvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import { /* storage, */ storageRef, base } from '../../firebase/firebase';
// import Preview from './Preview'



class AdBanner extends React.Component {
  state = {
    image: 'avatar.jpg',
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
    width: 500,
    height: 100,
    imageName: 'defaultName.png',
    message: ''
  }

  handleNewImage = e => {
    this.setState({ image: e.target.files[0] })
  }

  handleSave = data => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()

    this.setState({
      preview: {
        img,
        rect,
        scale: this.state.scale,
        width: this.state.width,
        height: this.state.height,
        borderRadius: this.state.borderRadius,
        imageName: this.state.imageName,
        contentType: 'image/png'
      },
    }, () => {
      this.uploadItem();
    });
  }

  uploadItem = () => {
    /* let metadata = {
      contentType: 'image/png'
    }; */

    let uploadTask = storageRef.child('images/' +  this.state.preview.imageName).putString(this.state.preview.img, 'data_url');
    uploadTask.on(/* storage.TaskEvent.STATE_CHANGED */'state_changed', // or 'state_changed'
    
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      /* 
      switch (snapshot.state) {
        case storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
        default:
          console.log('Upload is running and default is happening');
      } */
    },
     
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;
        /* ... */

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
        
        default:
          console.log('Storage default function is running');
      }
    }, () => {
      // Upload completed successfully, now we can get the download URL
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log('Download Url shown', downloadURL);

      let adBannerItem = {
        imageName: this.state.preview.imageName,
        url: downloadURL
      }

      base.addToCollection('adbanner', adBannerItem, adBannerItem.imageName).then(() => {
        this.setState({
          message: 'Image has been created successfully stored'
        });  
        
        /* 
          history.push(routeRoute.SIGN_IN); */
          debugger;
      }).catch((err) => {
          debugger;
          /* this.setState({
              message: err.message
          }); */
      });
    });
  }

  handleScale = e => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
    this.setState({ allowZoomOut })
  }

  rotateLeft = e => {
    e.preventDefault()

    this.setState({
      rotate: this.state.rotate - 90,
    })
  }

  rotateRight = e => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90,
    })
  }

  handleName = e => {
    this.setState({
      imageName: e.target.value
    })
  }

  handleBorderRadius = e => {
    const borderRadius = parseInt(e.target.value, 10);
    this.setState({ borderRadius })
  }

  handleXPosition = e => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } })
  }

  handleYPosition = e => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } })
  }

  handleWidth = e => {
    const width = parseInt(e.target.value, 10);
    this.setState({ width })
  }

  handleHeight = e => {
    const height = parseInt(e.target.value, 10);
    this.setState({ height })
  }

  logCallback = (e) => {
    // eslint-disable-next-line
    console.log('callback', e)
  }

  setEditorRef = editor => {
    if (editor) this.editor = editor
  }

  handlePositionChange = position => {
    this.setState({ position })
  }

  handleDrop = acceptedFiles => {
    this.setState({ image: acceptedFiles[0] })
  }

  render() {
    const { message } = this.state;

    return (
      <div>
        {message.length ? message : ''}
        <Dropzone
          onDrop={this.handleDrop}
          disableClick
          multiple={false}
          style={{ width: this.state.width, height: this.state.height, marginBottom:'35px' }}
        >
          <div>
            <ReactAvatarEditor
              ref={this.setEditorRef}
              scale={parseFloat(this.state.scale)}
              width={this.state.width}
              height={this.state.height}
              position={this.state.position}
              onPositionChange={this.handlePositionChange}
              rotate={parseFloat(this.state.rotate)}
              borderRadius={this.state.borderRadius}
              onSave={this.handleSave}
              onLoadFailure={() => this.logCallback('onLoadFailed')}
              onLoadSuccess={() => this.logCallback('onLoadSuccess')}
              onImageReady={() => this.logCallback('onImageReady')}
              onImageLoad={() => this.logCallback('onImageLoad')}
              image={this.state.image}
            />
          </div>
        </Dropzone>
        <br />
        New File:
        <input name="newImage" type="file" onChange={this.handleNewImage} />
        <br/>
        Image Name:
        <input name="imageName" type='text' onChange={this.handleName}/>
        <br />
        Zoom:
        <input
          name="scale"
          type="range"
          onChange={this.handleScale}
          min={this.state.allowZoomOut ? '0.1' : '1'}
          max="2"
          step="0.01"
          defaultValue="1"
        />
        <br />
        {'Allow Scale < 1'}
        <input
          name="allowZoomOut"
          type="checkbox"
          onChange={this.handleAllowZoomOut}
          checked={this.state.allowZoomOut}
        />
        <br />
        Border radius:
        <input
          name="scale"
          type="range"
          onChange={this.handleBorderRadius}
          min="0"
          max="100"
          step="1"
          defaultValue="0"
        />
        <br />
        Image Width:
        <input
          name="width"
          type="number"
          onChange={this.handleWidth}
          min="50"
          max="400"
          step="10"
          value={this.state.width}
        />
        <br />
        Image Height:
        <input
          name="height"
          type="number"
          onChange={this.handleHeight}
          min="50"
          max="400"
          step="10"
          value={this.state.height}
        />
        <br />
        X Position:
        <input
          name="scale"
          type="range"
          onChange={this.handleXPosition}
          min="0"
          max="1"
          step="0.01"
          value={this.state.position.x}
        />
        <br />
        Y Position:
        <input
          name="scale"
          type="range"
          onChange={this.handleYPosition}
          min="0"
          max="1"
          step="0.01"
          value={this.state.position.y}
        />
        <br />
        Rotate:
        <button onClick={this.rotateLeft}>Left</button>
        <button onClick={this.rotateRight}>Right</button>
        <br />
        <br />
        <button type="button" onClick={this.handleSave}>Save</button>
        <br/>
        {/* !!this.state.preview && (
          <img
            src={this.state.preview.img}
            alt='previewImage'
            style={{
              borderRadius: `${(Math.min(
                this.state.preview.height,
                this.state.preview.width
              ) +
                10) *
                (this.state.preview.borderRadius / 2 / 100)}px`,
            }}
          />
        ) */}

        {/*
        {!!this.state.preview && (
          <Preview
            width={
              this.state.preview.scale < 1
                ? this.state.preview.width
                : this.state.preview.height * 478 / 270
            }
            height={this.state.preview.height}
            image="avatar.jpg"
            rect={this.state.preview.rect}
          />
        )} */}
      </div>
    )
  }
}

// Used to display the cropping rect

export default AdBanner;