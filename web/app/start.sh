#!/bin/bash
cat /proc/asound/cards

amixer set Micro 100%
amixer set Master 100%
alsactl store

# Run below commands to test out speaker and microphone
# arecord -d4 --rate=44000 test.wav&
# speaker-test -l1 -c2 -t wav
# aplay test.wav

echo "starting nodejs voice  engine ..."
node index.js
echo "stopping nodejs voice  engine ..."