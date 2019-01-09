# Windows scripts

## Necessary tools

- [ExifTool](http://owl.phy.queensu.ca/~phil/exiftool/) _(tested with version 11.23)_

## Commands list

- [Add gps position](##add_gps_position.bat) : Add custom gps position (latitude and longitude) to each picture of a folder.  
- [Retrieve metadata](##retrieve_metadata.bat) : Copy metadata for each picture of a folder to each picture (with the same name) in an other folder.

## add_gps_position.bat

**Mandatory parameters :**

1. ImagesfolderToUse  
2. Latitude  
3. Longitude  

**Optional parameters :**

- -latRef : Indicates what hemisphere to use. By default the script use north hemisphere, if the latitude is negative use `-latRef S` and the absolute value of latitude  
- -longRef : Indicates what longitude axis to use. By default the script use east axis, if the longitude is negative use `-longRef W` and the absolute value of longitude  

**Examples :**  
Add the gps coordinates : 43.087062 6.159426  
`add_gps_position.bat .\dest 43.087062 6.159426`  
 ![example-add_gps_result](imgs/example-add_gps_result.jpg)  
Add the gps coordinates : 48.378117 -4.503119  
`add_gps_position.bat .\dest 48.378117 4.503119 -longRef W`  
 ![example-add_gps_result](imgs/example-add_gps_result.jpg)  
Add the gps coordinates : -22.814939 -42.891446  
`add_gps_position.bat .\dest 22.814939 42.891446 -latRef S -longRef W`  
 ![example-add_gps_result](imgs/example-add_gps_result.jpg)  

## retrieve_metadata.bat

**Mandatory parameters :**

1. ImagesfolderWithData  
2. ImagesFolderWithoutData

**Optional parameters :**

- -v : Display every file modifications

**Examples :**  
`retrieve_metadata.bat .\src .\dest -v`
 ![example-retrieve_metadata_verbose](imgs/example-retrieve_metadata_verbose.jpg)  