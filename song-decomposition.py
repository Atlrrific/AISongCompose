import midi
import numpy as np

#path = 'example.mid'
#path = 'Songs/my-heart-will-go-on-titanic.mid'
path = 'Songs/Suteki-Da-Ne.mid'
#path = 'Songs/bingopno.mid'
#path = 'Songs/Mozart-Movement.mid'
#path = 'Songs/london-bridges.mid'
#path = 'Songs/grenade.mid'
pattern = midi.read_midifile(path)
#print pattern


# Goes through extracted song and reconstruct them (pattern[1])
# Generic

tr = 1
start_val = 1
i = 1

# Grenade sample window
'''
tr = 5
start_val = 80
i = 80
'''

# Suteki Da Ne sample window
'''
tr = 2
start_val = 1
i = 1
'''

#print pattern[1]

print 'Extracting all of pattern[1]'

# Instantiate a MIDI Pattern (contains a list of tracks)
pat = midi.Pattern()

while True:
    # Instantiate a MIDI Track (contains a list of MIDI events)
    track = midi.Track()

    # Append the track to the pattern
    pat.append(track)
    print 'tr: ', tr
    
    if tr > 1:
        break


    '''
    while True:
        if i > len(pattern[tr]) - 2:
            break
        
        track.append(pattern[tr][i])

        i = i + 1

    '''
    i = 0
    tick_ar = np.array([])
    pitch_ar = np.array([])
    velocity_ar = np.array([])
    
    while True:
        if i > 60:
        #if i > len(pattern[tr]) - 2:
            break

        tick = pattern[tr][i].tick
        pitch = pattern[tr][i].data[0]

        # Because some pattern[][].data does not have a second array element
        if len(pattern[tr][i].data) == 2:
            velocity = pattern[tr][i].data[1]
        else:
            velocity = 0




        # Place all of tick, pitch, and velocity values in indiviudal vectors
        tick = np.array([tick])
        pitch = np.array([pitch])
        velocity = np.array([velocity])
        
        if i == start_val:
            tick_ar = tick
            pitch_ar = pitch
            velocity_ar = velocity
        else:
            tick_ar = np.concatenate((tick_ar, tick))
            pitch_ar = np.concatenate((pitch_ar, pitch))
            velocity_ar = np.concatenate((velocity_ar, tick))

        # To reconstruct the entire song in its (piano-like) original form
        track.append(midi.NoteOnEvent(tick= tick, channel=1, data=[np.array(pitch), velocity]))

        

        i = i + 1
    print len(pat[tr-1])
    break
    tr = tr + 1
#print pat

midi.write_midifile("example.mid", pat)

print 'Midi file was written for ', path
