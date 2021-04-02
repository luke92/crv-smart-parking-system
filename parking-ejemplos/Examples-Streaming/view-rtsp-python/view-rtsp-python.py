import cv2

vcap = cv2.VideoCapture("rtsp://localhost:8554/videoGrabado/2")
while(1):
    ret, frame = vcap.read()
    cv2.imshow('video', frame)
    cv2.waitKey(1)