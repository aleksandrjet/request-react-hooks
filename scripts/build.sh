#!/bin/bash

rm -rf ./lib-esm
rm -rf ./lib-cjs

esbuild src/index.ts \
 --bundle \
 --format=esm \
 --outfile=lib-esm/index.js \
 --packages=external

esbuild src/index.ts \
 --bundle \
 --format=cjs \
 --outfile=lib-cjs/index.js \
 --packages=external

tsc --emitDeclarationOnly --outDir lib-esm
