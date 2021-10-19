#!/bin/bash
cd /home/kekusmax/home
sed -i '25s/.*/var dbLink = "http:\/\/34.71.178.28:8081";/' server.js
node server.js