#!/bin/bash

ZIP_NAME="miniflux-youtube-thumbnails-extension.xpi"

rm -f "$ZIP_NAME"

zip -r "$ZIP_NAME" manifest.json content.js icons/*.svg README.md
