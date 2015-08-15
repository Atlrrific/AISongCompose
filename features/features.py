import wave, struct
import numpy as np

class WaveFile():
    def __init__(self, filename):
        try:
            self.waveFile = wave.open(filename)
        except:
            print "Error opening fle :("

    def frequencyDomain(self):
        self.numFrames = self.waveFile.getnframes()
        print self.numFrames
        freqData = self.waveFile.readframes(self.numFrames)
        freqData = struct.unpack('{n}h'.format(n=18404352), freqData)
        print 1
        freqData = np.array(freqData)
        print 2
        frequencies = np.fft.fftfreq(len(np.fft.fft(freqData)))
        print 3
        return frequencies
