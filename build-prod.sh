#!/bin/bash

rm -rf ./dist
yarn build-extension-prod
cp ./src/extension/manifest.json ./dist/
mkdir -p ./dist/images
cp ./src/extension/images/* ./dist/images/


# this is so that zip file contains the folder "time-odds-for-lichess"
rm -rf ./time-odds-for-lichess
mkdir -p ./time-odds-for-lichess
cp -r ./dist/* ./time-odds-for-lichess/

# store the stable release version
rm -rf ./stable
mkdir -p ./stable
zip -r ./stable/time-odds-for-lichess.zip ./time-odds-for-lichess/


# cleanup
rm -rf ./time-odds-for-lichess

