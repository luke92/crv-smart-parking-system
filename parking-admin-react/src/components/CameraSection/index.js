import React from 'react'
import ReactHlsPlayer  from 'react-hls-player'
import './CameraSection.css'

const CameraSection = props => (
    <ReactHlsPlayer 
        url={`${props.camera.url}`}
        autoplay={true}
        controls={false}
        width="auto"
        height="auto"
        className={`${props.className}`}
        muted
    />
)

export default CameraSection