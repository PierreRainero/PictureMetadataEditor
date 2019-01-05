# Windows scripts

## Necessary tools

- [ExifTool](http://owl.phy.queensu.ca/~phil/exiftool/) _(tested with version 11.23)_

## Commands list

- [Retrieve metadata](##retrieve_metadata.bat) : Copy metadata for each picture of a folder to each picture (with the same name) in an other folder.

## retrieve_metadata.bat

**Mandatory parameters :**

1. ImagesfolderWithData
2. ImagesFolderWithoutData

**Optional parameters :**

- -v : Display every file modifications

**Examples :**  
`retrieve_metadata.bat .\src .\dest -v`
 ![example-retrieve_metadata_verbose](imgs/example-retrieve_metadata_verbose.jpg)  
