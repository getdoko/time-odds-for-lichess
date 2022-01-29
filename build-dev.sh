#!/bin/bash

rm -rf ./dist
yarn build-extension-dev
cp ./src/extension/manifest.json ./dist/
mkdir -p ./dist/images
cp ./src/extension/images/* ./dist/images/
