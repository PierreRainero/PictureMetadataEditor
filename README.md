# Picture Metadata Editor

[![Build Status](https://travis-ci.com/PierreRainero/PictureMetadataEditor.svg?branch=master)](https://travis-ci.com/PierreRainero/PictureMetadataEditor)

## Summary

_Picture Metadata Editor_ is a free tool to retrieve and add metadata of pictures. It's based on [exiftool](https://www.sno.phy.queensu.ca/~phil/exiftool/) (much love to _Phil Harvey_ who works on it). This project provides scripts (features as command line in a terminal) and a cross-platform GUI (Graphic User Interface). Building a local app (CLI ou "native" application) allows you to edit your picture without sending it through internet.

### Application

* [CLI for windows](./windows)
* [Cross-platform GUI](./gui-electron)

## Goal

This project was born from a simple need : "when I optimize pictures size i lost all the metadata". I want to keep at least GPS position and the capture date, so I created some scripts in order to copy all data from originals pictures to optimized versions. After this was done, I saw some others possibilities for the project and I use it as a sandbox to test techonologies I didn't know anything about, like [Electron](https://electronjs.org/) (or which I appreciated, like [React](https://reactjs.org/)).

## Contribute

This project is free and open source, feel free to contribute by anyway.  
You can post an [issue](https://github.com/PierreRainero/PictureMetadataEditor/issues/new) to report a bug or ask for a feature (try to use correct [labels](https://github.com/PierreRainero/PictureMetadataEditor/labels) please).  
You can also assign yourself an issue and develop it if you want, I'll be happy to merge your [pull request](https://github.com/PierreRainero/PictureMetadataEditor/pulls). Be careful and always link your commit to an issue if possible and be aware about tests (there is dedicated README files for subfolders to know how to launch tests but also how to write your own).
