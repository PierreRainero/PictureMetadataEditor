setlocal EnableDelayedExpansion
@ECHO OFF

REM HOW TO USE IT
REM retrieve_metadata.bat .\src .\dest

SET imagesWithData=%1
SET imagesWithoutData=%2

REM For each jpg file in the folder of the "imagesWithData"
FOR %%f IN (%imagesWithData%\*.jpg) DO (
    exiftool.exe "-DateTimeOriginal" %%f > temp.txt

    REM Parsing the output to select the shooting date :
    SET /p shootingDate=<temp.txt
    CALL :substringDate "!shootingDate!" result

    REM Use the name of the "imageWithData" to access to the "imageWithoutData" :
    SET str=%%f
    CALL SET str=%%str:%imagesWithData%=%imagesWithoutData%%%

    REM Inform the user of the operation :
    ECHO %%f !str!
    ECHO     Shooting date : !result!

    REM Copy the "shooting date" of the "imageWithData" to the "imageWithoutData" :
    exiftool.exe "-DateTimeOriginal=!result!" !str!
    DEL "!str!_original"
)

DEL temp.txt

:substringDate
    SET "string=%1"
    SET %2=%string:~35,19%
GOTO:eof