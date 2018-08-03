/* global WaveSurfer */
/* global Regions */
// components/waveform.js
import React from 'react'
import ReactDOM from 'react-dom'
//import WaveSurfer from './wavesurfer.js'

export default class WaveForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    //this.$el = ReactDOM.findDOMNode(this)
    //this.$waveform = this.$el.querySelector('.wave')
    this.wavesurfer = WaveSurfer.create({
      container: this.refs.waveform,
      waveColor: 'violet',
      progressColor: 'purple'
    })
    console.log(['wf mount ',this.wavesurfer]);
    this.wavesurfer.load(this.props.src)
  }
  componentWillUnmount() {

  }
  render() {
    return (
      <div className='waveform'  >
         WF
        <div className='wave' ref="waveform"  ></div>
      </div>
    )
  }
}

WaveForm.defaultProps = {
  src: ""
}
