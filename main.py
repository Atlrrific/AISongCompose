from features.features import WaveFile

testFile = WaveFile("test.wav")
asfd = testFile.frequencyDomain()

print 'Asfd: ', asfd

for i in asfd:
    print i
