@ECHO OFF
:: Compatible ExifToolVersion : 11.23
setlocal EnableDelayedExpansion

:: ****** ADD GPS POSITION ******
:: Version  : 1.0
:: Author   : Pierre RAINERO
:: ******* HOW TO USE IT *******
:: add_gps_position.bat ImagesfolderWithData latitudeValue longitudeValue [options]
:: ********** OPTIONS **********
:: -latRef  : Should be follow by "N" or "S", it's corresponding to the hemisphere.
::            If the latitude is negative use : "-latRef  S"
::            Default value : N
:: -longRef : Should be follow by "E" or "W", it's corresponding to the longitude axis.
::            If the longitude is negative use : "-longRef  W"
::            Default value : E
:: *****************************

:: Mandatory parameters :
SET folderToUser=%1
SET latitude=%2
SET longitude=%3

:: Optional parameters :
SHIFT & SHIFT
:loop
IF NOT "%1"=="" (
    IF "%1"=="-latRef" (
        SET refLat=%2
        SHIFT
    )
    IF "%1"=="-longRef" (
        SET refLong=%2
        SHIFT
    )
    SHIFT
    GOTO :loop
)

IF NOT DEFINED refLat (
    SET refLat=N
)
IF NOT DEFINED refLong (
    SET refLong=E
)

REM For each jpg file in the folder of the "folderToUser" :
FOR %%f IN (%folderToUser%\*.jpg) DO (
    exiftool.exe -GPSLatitude="!latitude!" -GPSLongitude="!longitude!" -exif:gpslatituderef=!refLat! -exif:gpslongituderef=!refLong! "%%f"
    DEL "%%f"_original
)