#!/bin/bash
cd /home/kekusmax/frontend/frontend/classements
sed -i '2s/.*/let address = "35.225.209.68";/' classements.js
cd ..
python3 -m http.server