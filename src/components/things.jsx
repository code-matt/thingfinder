import React from 'react'

export default class Things extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    let images = this.props.images.map((image, index) => {
      let img = new Image()
      img.src = image
      return (
        <div className='pictures' key={'picture' + index}>
          <img src={image} />
          <div className='remove-button' onClick={() => this.props.removePicture(index)}>
            Remove
          </div>
          <hr />
        </div>
      )
    })
    return (
      <div className='thingsPage'>
        <h1>
          <div className='add-button' onClick={this.props.addPicture}>
            Add Picture
          </div>
        </h1>
        {images}
      </div>
    )
  }
}
