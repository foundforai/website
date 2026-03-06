#!/bin/bash
set -e
vite build
vite build --ssr src/entry-server.tsx --outDir ../dist/server
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
