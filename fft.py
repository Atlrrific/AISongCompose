import numpy as np
import scipy.io.wavfile as wav
import matplotlib.pyplot as plt
 
data = wav.read("test.wav")[1]
data = np.fft.fft(data)
print data
print 'Reducing data. . .'
size_red = 10000 
data_r = data[:size_red]
print 'size: ', data_r.shape
plt.plot(np.real(data_r))
plt.show()

