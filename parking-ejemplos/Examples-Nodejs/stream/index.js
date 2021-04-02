// Se necesita correr startStreaming.bat de https://gitlab.com/crvsmartparkingsystem/parking-streaming
Stream = require('node-rtsp-stream')
stream = new Stream({
  name: 'name',
  streamUrl: 'rtsp://localhost:8554/videoGrabado/3', 
  wsPort: 9999,
  ffmpegOptions: { // options ffmpeg flags
    '-max_muxing_queue_size': '9999',
    '-crf': '0',
    '-stats': '', // an option with no neccessary value uses a blank string
    '-r': 60 // options with required values specify the value after the key
  }
})