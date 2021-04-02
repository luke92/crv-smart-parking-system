from imutils.video import VideoStream

ips = ['192.168.1.33:8081']
vs = [VideoStream(src=str(x)).start() for x in ips]
for i, vsi in enumerate(vs):
    frame = vsi.read()
    # Start your image processing here
