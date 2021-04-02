const Stream = require('node-rtsp-stream-es6')

const options = {
  name: 'streamName',
  url: 'rtsp://localhost:8554/videoGrabado/2',
  port: 5000
}

stream = new Stream(options)

stream.start()