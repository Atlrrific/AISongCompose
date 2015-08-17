#!/usr/bin/python3
import pyaudio
 
#   Initialise PyAudio
PyAudio = pyaudio.PyAudio       # error msgs are usually safe to ignore
pa = PyAudio()
audio = pa.open(format=pa.get_format_from_width(1),channels=1,rate=8000,output=True)
 
t = 0
while True:
    audio.write(chr(t%256))                     # convert to 8-bit
    t += 1
