from features.features import WaveFile

testFile = WaveFile("test.wav")
asfd = testFile.frequencyDomain()

for i in asfd:
    print i
