@ECHO OFF
:: Compatible ExifToolVersion : 11.23
setlocal EnableDelayedExpansion

:: ****** RETRIEVE METADA ******
:: Version  : 1.3
:: Author   : Pierre RAINERO
:: ******* HOW TO USE IT *******
:: retrieve_metadata.bat ImagesfolderWithData ImagesFolderWithoutData [options]
:: ********** OPTIONS **********
:: -v       : Display every file modifications
:: *****************************

:: Mandatory parameters :
SET imagesWithData=%1
SET imagesWithoutData=%2

:: Optional parameters :
SHIFT & SHIFT
:loop
IF NOT "%1"=="" (
    IF "%1"=="-v" (
        SET verbose=y
        SHIFT
    ) ELSE (
        SET verbose=
    )

    SHIFT
    GOTO :loop
)

:: For each jpg file in the folder of the "imagesWithData" :
FOR %%f IN (%imagesWithData%\*.jpg) DO (
    :: Parsing the output to select the shooting date :
    exiftool.exe -m "-DateTimeOriginal" "%%f" > temp.txt
    SET    shootingDate=
    SET /p shootingDate=<temp.txt
    IF [!shootingDate!]==[] (
        SET resultShootingDate=
    ) ELSE (
        SET resultShootingDate=!shootingDate:~34!
    )
    
    :: Parsing the output to select the gps position :
    exiftool.exe -m -n "-GPSLatitude" "%%f" > temp.txt
    SET    gpsLatitude=
    SET /p gpsLatitude=<temp.txt
    IF [!gpsLatitude!]==[] (
        SET resultGpsLatitude=
    ) ELSE (
        SET resultGpsLatitude=!gpsLatitude:~34!
    )
    exiftool.exe -m -n "-GPSLongitude" "%%f" > temp.txt
    SET    gpsLongitude=
    SET /p gpsLongitude=<temp.txt
    IF [!gpsLongitude!]==[] (
        SET resultGpsLongitude=
    ) ELSE (
        SET resultGpsLongitude=!gpsLongitude:~34!
    )

    :: Use the name of the "imageWithData" to access to the "imageWithoutData" :
    SET str=%%f
    CALL SET str=%%str:%imagesWithData%=%imagesWithoutData%%%

    :: If verbose option is on :
    IF DEFINED verbose (
        :: Inform the user of the operation :
        ECHO %%f !str!
        IF DEFINED resultShootingDate (
            ECHO     Shooting date : !resultShootingDate!
        )
        IF DEFINED resultGpsLatitude (
            IF DEFINED resultGpsLongitude (
                ECHO     GPS position  : !resultGpsLatitude!, !resultGpsLongitude!
            )
        )
    )

    :: Copy the metadata of the "imageWithData" to the "imageWithoutData" :
    exiftool.exe -DateTimeOriginal="!resultShootingDate!" -GPSLatitude="!resultGpsLatitude!" -GPSLongitude="!resultGpsLongitude!" "!str!"
    DEL "!str!_original"
)

:: Delete temporary file
DEL temp.txt