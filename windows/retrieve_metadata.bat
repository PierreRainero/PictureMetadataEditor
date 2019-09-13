@ECHO OFF
:: Compatible ExifToolVersion : 11.23
setlocal EnableDelayedExpansion

:: ****** RETRIEVE METADA ******
:: Version  : 1.5
:: Author   : Pierre RAINERO
:: ******* HOW TO USE IT *******
:: retrieve_metadata.bat ImagesfolderWithData ImagesFolderWithoutData [options]
:: ********** OPTIONS **********
:: -v       : Display every file modifications
:: -ext     : Should be follow by a string representing the extension file to use. 
::            Default value : jpg
:: *****************************

:: Mandatory parameters :
SET imagesWithData=%1
SET imagesWithoutData=%2

:: Optional parameters :
SHIFT
:loop
IF NOT "%1"=="" (
    IF "%1"=="-v" (
        SET verbose=y
    )
    IF "%1"=="-ext" (
        SET ext=%2
        SHIFT
    )

    SHIFT
    GOTO :loop
)

IF NOT DEFINED ext (
    SET ext=jpg
)
IF NOT DEFINED verbose (
    SET verbose=
)

:: For each jpg file in the folder of the "imagesWithData" :
FOR %%f IN (%imagesWithData%\*.!ext!) DO (
    :: Parsing the output to select the shooting date :
    exiftool.exe -m "-DateTimeOriginal" "%%f" > temp.txt
    SET    shootingDate=
    SET /p shootingDate=<temp.txt
    IF [!shootingDate!]==[] (
        SET resultShootingDate=
    ) ELSE (
        SET resultShootingDate=!shootingDate:~34!
    )
    
    :: Parsing the output to select the gps position. First retrieve correct axis to use :
    exiftool.exe -m "-GPSLatitudeRef" "%%f" > temp.txt
    SET    gpsLatitudeRef=
    SET /p gpsLatitudeRef=<temp.txt
    IF [!gpsLatitudeRef!]==[] (
        SET resultgpsLatitudeRef=
    ) ELSE (
        SET resultgpsLatitudeRef=!gpsLatitudeRef:~34!
    )
    exiftool.exe -m "-GPSLongitudeRef" "%%f" > temp.txt
    SET    gpsLongitudeRef=
    SET /p gpsLongitudeRef=<temp.txt
    IF [!gpsLongitudeRef!]==[] (
        SET resultgpsLongitudeRef=
    ) ELSE (
        SET resultgpsLongitudeRef=!gpsLongitudeRef:~34!
    )

    :: Then retrieve coordinates :
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
    exiftool.exe -DateTimeOriginal="!resultShootingDate!" -GPSLatitudeRef="!resultgpsLatitudeRef!" -GPSLongitudeRef="!resultgpsLongitudeRef!" -GPSLatitude="!resultGpsLatitude!" -GPSLongitude="!resultGpsLongitude!" "!str!"

    DEL "!str!_original"
)

:: Delete temporary file
IF EXIST temp.txt (
    DEL temp.txt
) ELSE (
    ECHO [WARNING] : No files were modified
    ECHO             Make sure folders are not empty or extension files matches well, check -ext option
)