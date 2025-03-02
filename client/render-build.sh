#!/usr/bin/env bash
# Elimina la carpeta node_modules y el lockfile
rm -rf node_modules package-lock.json
# Reinstala las dependencias
npm install
# Corre el build
npm run build
