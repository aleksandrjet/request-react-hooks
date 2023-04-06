#!/bin/bash

rm -rf ./lib

esbuild src/index.ts \
 --bundle \
 --format=esm \
 --outfile=lib/index.js \
 --packages=external

tsc --emitDeclarationOnly --outDir lib
