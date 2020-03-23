import os
import cv2
import time
from base_camera import BaseCamera
import frameoper as fopr


class Camera(BaseCamera):
    video_source = 0

    def __init__(self):
        if os.environ.get('OPENCV_CAMERA_SOURCE'):
            Camera.set_video_source(int(os.environ['OPENCV_CAMERA_SOURCE']))
        super(Camera, self).__init__()

    @staticmethod
    def set_video_source(source):
        Camera.video_source = source

    @staticmethod
    def frames():
        camera = cv2.VideoCapture(Camera.video_source)
        if not camera.isOpened():
            raise RuntimeError('Could not start camera.')
        # @JSZ initiate fps counter
        frameCnt = 0
        start = time.time()
        fps=0.0

        while True:
            # @JSZ fps counter
            frameCnt+=1
            time.sleep(0.001)
            if frameCnt % 10 == 0:
                end = time.time()
                fps = 10 / (end - start)
                frameCnt=0
                start = time.time()
            # read current frame
            _, frame = camera.read()

            # @JSZ Our operations on the frame come here
            # gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            # frame = fopr.detect_face(frame)
            # frame = fopr.detect_lines(frame)
            # @JSZ Let's add some text to the frame
            font = cv2.FONT_HERSHEY_SIMPLEX
            score='FPS={:2.2f}'.format(fps)
            cv2.putText(frame,text=score,org=(20,50), fontFace=font,fontScale=1,color=(255,0,0),thickness=2,lineType=cv2.LINE_AA)

            # @JSZ resize image
            # frame = cv2.resize(frame,(320,240),fx=0,fy=0, interpolation = cv2.INTER_CUBIC)

            # encode as a jpeg image and return it
            yield cv2.imencode('.jpg', frame)[1].tobytes()
