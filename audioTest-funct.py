import math
import pyaudio

#sudo apt-get install python-pyaudio
PyAudio = pyaudio.PyAudio

#See http://en.wikipedia.org/wiki/Bit_rate#Audio
BITRATE = 16000 #number of frames per second/frameset.      

#See http://www.phy.mtu.edu/~suits/notefreqs.html
'''
FREQUENCY = 1000.63 #Hz, waves per second, 261.63=C4-note.
LENGTH = 5.2232 #seconds to play sound
'''

def add_note(FREQUENCY, LENGTH):
    NUMBEROFFRAMES = int(BITRATE * LENGTH)
    RESTFRAMES = NUMBEROFFRAMES % BITRATE
    WAVEDATA = ''    

    for x in xrange(NUMBEROFFRAMES):
     WAVEDATA = WAVEDATA+chr(int(math.sin(x/((BITRATE/FREQUENCY)/math.pi))*127+128))    

    #fill remainder of frameset with silence
    for x in xrange(RESTFRAMES): 
     WAVEDATA = WAVEDATA+chr(128)

    return WAVEDATA

p = PyAudio()
stream = p.open(format = p.get_format_from_width(1), 
                channels = 1, 
                rate = BITRATE, 
                output = True)

WAVEDATA = add_note(1000.63, 0.2232)
stream.write(WAVEDATA)
WAVEDATA = add_note(2000.63, 0.2232)
stream.write(WAVEDATA)
WAVEDATA = add_note(3000.63, 0.2232)
stream.write(WAVEDATA)
WAVEDATA = add_note(1000.63, 0.2232)
stream.write(WAVEDATA)



stream.stop_stream()
stream.close()
p.terminate()
