import React from 'react'
import Things from './things.jsx'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      images: [],
      showMain: false
    }
    this.addPicture = this.addPicture.bind(this)
    this.removePicture = this.removePicture.bind(this)
    this.cameraSuccess = this.cameraSuccess.bind(this)
    this.cameraError = this.cameraError.bind(this)
    this.startFindingThings = this.startFindingThings.bind(this)
    this.findThingsFail = this.findThingsFail.bind(this)
    this.findThingsSuccess = this.findThingsSuccess.bind(this)
    this.settingPatterns = this.settingPatterns.bind(this)
    this.patternSuccess = this.patternSuccess.bind(this)
    this.patternFail = this.patternFail.bind(this)
    this.setTimeout = this.setTimeout.bind(this)
    this.timeoutSuccess = this.timeoutSuccess.bind(this)
    this.timeoutFail = this.timeoutFail.bind(this)
    this.isItDetecting = this.isItDetecting.bind(this)
    this.detectionSuccess = this.detectionSuccess.bind(this)
    this.detectionFail = this.detectionFail.bind(this)
    this.detector = window.plugins.ImageDetectionPlugin
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount () {
    var _this = this
    var element = document.getElementById('swipe')
    var hammertime = new Hammer(element)
    hammertime.on('swiperight', (ev) => {
      setTimeout(() => {
        _this.setState({
          showMain: !_this.state.showMain
        })
      }, 300)
      nativetransitions.flip(0.6, 'left')
    })
    hammertime.on('swipeleft', (ev) => {
      setTimeout(() => {
        _this.setState({
          showMain: !_this.state.showMain
        })
      }, 300)
      nativetransitions.flip(0.6, 'right')
    })
  }

  addPicture () {
    navigator.camera.getPicture(
      this.cameraSuccess,
      this.cameraError, {
        destinationType: 0,
        targetWidth: 180,
        targetHeight: 240
      }
    )
  }

  removePicture (index) {
    this.state.images.splice(index, 1)
    var newArr = this.state.images.concat([])
    this.setState({
      images: newArr
    })
  }

  cameraSuccess (imageData) {
    this.setState({ images: this.state.images.concat(['data:image/jpeg;base64,' + imageData]) })
    // var image = new Image()
    // image.src = 'data:image/jpeg;base64,' + imageData
    // var _this = this
    // var img = new Image()
    // img.crossOrigin = 'Anonymous'
    // img.onload = () => {
    //   var canvas = document.createElement('canvas')
    //   var ctx = canvas.getContext('2d')
    //   var dataURL
    //   canvas.height = img.height
    //   canvas.width = img.width
    //   ctx.drawImage(img, 0, 0)
    //   dataURL = canvas.toDataURL('image/jpeg', 0.8)
    //   _this.setState({ images: _this.state.images.concat([dataURL]) })
    // }
    // img.src = 'http://media-minecraftforum.cursecdn.com/avatars/132/211/635357274046452458.png'
  }

  cameraError (error) {
    console.log(error)
  }

  setTimeout (seconds) {
    this.detector.setDetectionTimeout(seconds, this.timeoutSuccess, this.timeoutFail)
  }

  timeoutSuccess (data) {
    console.log(data)
  }

  timeoutFail (error) {
    console.log(error)
  }

  startFindingThings () {
    this.detector.isDetecting(this.detectionSuccess, this.detectionFail)
    setTimeout(() => {
      this.detector.startProcessing(true, this.findThingsSuccess, this.findThingsFail)  
    }, 6000)
    this.detector.setPatterns(this.state.images, this.patternSuccess, this.patternFail)
    // this.detector.startProcessing(true, this.findThingsSuccess, this.findThingsFail)
    // this.detector.setDetectionTimeout(20, this.timeoutSuccess, this.timeoutFail)
  }

  findThingsSuccess (data) {
    console.log(data)
  }

  findThingsFail (error) {
    console.log(error)
  }

  settingPatterns () {
    this.detector.setPatterns(this.state.images, this.patternSuccess, this.patternFail)
  }

  patternSuccess (data) {
    console.log(data)
  }

  patternFail (error) {
    console.log(error)
  }

  detectionSuccess (data) {
    console.log(data + 'hello world')
  }

  detectionFail (error) {
    console.log(error)
  }

  isItDetecting () {
    this.detector.isDetecting(this.detectionSuccess, this.detectionFail)
  }

  render () {
    return (
      <div id='swipe' style={{color: '#FFF', background: 'transparent', height: '100vh', width: '100vw'}}>
        <div className='banner'>
          <h1>ThingFinder</h1>
        </div>
        {this.state.showMain
          ? <Things
            addPicture={this.addPicture}
            images={this.state.images}
            removePicture={this.removePicture}
          />
          : <div>

            <div className='find-button' onClick={this.startFindingThings}>
              <h3>Find Thing</h3>
            </div>
          </div>
        }
      </div>
    )
  }
}
