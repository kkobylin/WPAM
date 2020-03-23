import cv2
import time
import numpy as np
face_cascade = cv2.CascadeClassifier('./DATA/haarcascades/haarcascade_frontalface_default.xml')

def detect_face(img):

    work_img = img.copy()
    faces = face_cascade.detectMultiScale(work_img)

    for (x,y,w,h) in faces:
        work_img = cv2.rectangle(work_img, (x,y), (x+w,y+h), (0,250,0), 1)
        roi_face = work_img[y:y+h, x:x+w]

    return work_img

def detect_lines(img):
    work_img = img.copy()
    gray = cv2.cvtColor(work_img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150, apertureSize = 3)

    return edges
