#import midi
#from midiutil.MidiFile import MIDIFile
import numpy as np
import os
import os.path

import math
import pyaudio

import numpy as np
import scipy.io.wavfile as wav
import matplotlib.pyplot as plt

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



#data = wav.read("drum_loop_01.wav")[1]
data = wav.read("lulBrahams2.wav")[1]
data = np.fft.fft(data)
#print data
#print 'Reducing data. . .'
size_red = 12176

# Restricts the size of output
data_r = data[:size_red]

#print 'size: ', data_r.shape

slash = '/'




#print 'Converting data to list. . .'

# Extract the first 30 elements of the data vector, then convert to list

window_len = 1000

#window_len = 100

fre_data = np.real(data_r.flatten()[:window_len]).tolist()

#print 'Data Converted'


# Put time series into a supervised dataset, where the target for
# each sample is the next sample

from pybrain.datasets import SequentialDataSet
from itertools import cycle

INPUT = 1
HIDDEN_LAYERS = 2
OUTPUT = 1


ds = SequentialDataSet(INPUT, OUTPUT)


# Adding sequence of numbers (of both features) into neural network
for (sample, next_sample) in zip(fre_data, cycle(fre_data[1:])):
    #ds.addSample((sample, velocity_data[i], tick_data[i]), next_sample)
    ds.addSample(sample, next_sample)


# Build a simple LSTM networ end of the song somewhere around last 15 sec when my line pop. stupid friend decide it is a good time to send LL stickerk with 1 input node, 5 LSTM cells and 1 output node:

from pybrain.tools.shortcuts import buildNetwork
from pybrain.structure.modules import LSTMLayer

#print 'Constructing neutral network. . .'
net = buildNetwork(
    INPUT,
    HIDDEN_LAYERS,
    OUTPUT,
    hiddenclass=LSTMLayer,
    outputbias=False,
    recurrent=True,
    )

# Train the network

from pybrain.supervised import RPropMinusTrainer
from sys import stdout


print 'Starting to train neural network. . .'
trainer = RPropMinusTrainer(net, dataset=ds)
train_errors = []  # save errors for plotting later
EPOCHS_PER_CYCLE = 5
#CYCLES = 200
CYCLES = 100
EPOCHS = EPOCHS_PER_CYCLE * CYCLES
#print 'Entering loop. . .'
for i in xrange(CYCLES):
    # Does the training
    trainer.trainEpochs(EPOCHS_PER_CYCLE)
    train_errors.append(trainer.testOnData())
    epoch = (i + 1) * EPOCHS_PER_CYCLE 
    print 'i: ', i
    print ('\r epoch {}/{}'.format(epoch, EPOCHS))

    stdout.flush()
#print 'Exit loop'
#print ''

print 'final error =', train_errors[-1]

# Plot the errors (note that in this simple toy example,
# we are testing and training on the same dataset, which
# is of course not what you'd do for a real project!):

import matplotlib.pyplot as plt

plt.plot(range(0, EPOCHS, EPOCHS_PER_CYCLE), train_errors)
plt.xlabel('epoch')
plt.ylabel('error')
plt.show()

# Now ask the network to predict the next sample
PyAudio = pyaudio.PyAudio
BITRATE = 16000 

p = PyAudio()
stream = p.open(format = p.get_format_from_width(1), 
                channels = 1, 
                rate = BITRATE, 
                output = True)
#timePeriod = (60*6 + 1)/size

f = open('workfile.txt', 'w')
sequence = "["
i = 0
for (sample, target) in ds.getSequenceIterator(0):

    pred = net.activate(sample)
    WAVEDATA = add_note(pred, 0.08)
    stream.write(WAVEDATA)

    if (int(pred[0]) < 10) and (int(pred[0]) > -10):
        sequence = sequence + "0" + ", "
    else:
        if (int(pred[0])>3000) :
            sequence = sequence + str (int(pred[0])-2400) + ", "
        else: 
            if (int(pred[0])>2000) and (int(pred[0])<3000):
                 sequence = sequence + str (int(pred[0])-1600) + ", "
            else:
                if (int(pred[0])>1000) and (int(pred[0])<2000):
                    equence = sequence + str (int(pred[0])-1600) + ", "
                else:
                    sequence = sequence + str (int(pred[0])) + ", "

sequence = sequence + "]"
f.write(sequence)

stream.stop_stream()
stream.close()
p.terminate()
print 'Finished prediction'

                 
                

