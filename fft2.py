import numpy as np
import scipy.io.wavfile as wav
import matplotlib.pyplot as plt
 
data = wav.read("drum_loop_01.wav")[1]
print data.shape
data = np.fft.fft(data)
print data.shape
size = data.shape[0]
print 'size: ', data.shape[0]
print data
print 'Reducing data. . .'

# Restrict size of input 
size_red = 3000 
data_r = data#[:size_red]
print 'size: ', data_r.shape


plt.plot(np.real(data_r))
plt.show()

data_real  = np.real(data_r)

import math
import pyaudio

#sudo apt-get install python-pyaudio
PyAudio = pyaudio.PyAudio

#See http://en.wikipedia.org/wiki/Bit_rate#Audio
BITRATE = 17000 #number of frames per second/frameset.      

#See http://www.phy.mtu.edu/~suits/notefreqs.html
FREQUENCY = 1000.63 #Hz, waves per second, 261.63=C4-note.
LENGTH = 10 #seconds to play sound

NUMBEROFFRAMES = int(BITRATE * LENGTH)
RESTFRAMES = NUMBEROFFRAMES % BITRATE
WAVEDATA = ''    

# i=0
# j = 0
# while True:

# 	j = 0
# 	while j < 1:	
# 		print data[i]
# 		j = j +1
# 	i = i + 1

# print data_real.shape
# i = 0
# while i < data_real.shape[0]:
# 	WAVEDATA = WAVEDATA+chr(int(math.sin(size_red/((BITRATE/data_real[i][0]*100)/math.pi))*127+128))   
# 	print data_real[i][0] 
# 	i = i +1


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

# WAVEDATA = add_note(1000.63, 0.2232)
# stream.write(WAVEDATA)
# WAVEDATA = add_note(2000.63, 0.2232)
# stream.write(WAVEDATA)
# WAVEDATA = add_note(3000.63, 0.2232)
# stream.write(WAVEDATA)
# WAVEDATA = add_note(1000.63, 0.2232)
# stream.write(WAVEDATA)

timePeriod = (60*6 + 1)/size
print data_real.shape
i = 0
while i < data_real.shape[0]:
	# WAVEDATA = WAVEDATA+chr(int(math.sin(size_red/((BITRATE/data_real[i][0]*100)/math.pi))*127+128))   
	WAVEDATA = add_note(data_real[i][0], 0.062226582)
	print data_real[i][0]
	stream.write(WAVEDATA)
	#print data_real[i][0] 
	i = i +1



stream.stop_stream()
stream.close()
p.terminate()


