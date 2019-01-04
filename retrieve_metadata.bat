REM Compatible ExifToolVersion : 11.23
setlocal EnableDelayedExpansion
@ECHO OFF

REM HOW TO USE IT
REM retrieve_metadata.bat .\src .\dest

SET imagesWithData=%1
SET imagesWithoutData=%2

REM For each jpg file in the folder of the "imagesWithData"
FOR %%f IN (%imagesWithData%\*.jpg) DO (
    REM Parsing the output to select the shooting date :
    exiftool.exe "-DateTimeOriginal" %%f > temp.txt
    SET /p shootingDate=<temp.txt
    IF [!shootingDate!]==[] (
        SET resultShootingDate=
    ) ELSE (
        SET resultShootingDate=!shootingDate:~34!
    )
    
    REM Parsing the output to select the gps position :
    exiftool.exe -n "-GPSLatitude" %%f > temp.txt
    SET /p gpsLatitude=<temp.txt
    IF [!gpsLatitude!]==[] (
        SET resultGpsLatitude=
    ) ELSE (
        SET resultGpsLatitude=!gpsLatitude:~34!
    )
    exiftool.exe -n "-GPSLongitude" %%f > temp.txt
    SET /p gpsLongitude=<temp.txt
    IF [!gpsLongitude!]==[] (
        SET resultGpsLongitude=
    ) ELSE (
        SET resultGpsLongitude=!gpsLongitude:~34!
    )

    REM Use the name of the "imageWithData" to access to the "imageWithoutData" :
    SET str=%%f
    CALL SET str=%%str:%imagesWithData%=%imagesWithoutData%%%

    REM Inform the user of the operation :
    ECHO %%f !str!
    ECHO     Shooting date : !resultShootingDate!
    ECHO     GPS position  : !resultGpsLatitude!, !resultGpsLongitude!

    REM Copy the metadata of the "imageWithData" to the "imageWithoutData" :
    exiftool.exe -DateTimeOriginal="!resultShootingDate!" -GPSLatitude="!resultGpsLatitude!" -GPSLongitude="!resultGpsLongitude!" !str!
    DEL "!str!_original"

    REM Reinitialize metadata variables
    SET shootingDate=
    SET resultGpsLatitude=
    SET resultGpsLongitude=
)

DEL temp.txt