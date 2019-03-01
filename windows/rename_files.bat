@ECHO OFF
setlocal EnableDelayedExpansion

:: ****** RENAME FILES ******
:: Version  : 1.0
:: Author   : Pierre RAINERO
:: ******* HOW TO USE IT *******
:: rename_files.bat ImagesFolderToUse [options]
:: ********** OPTIONS **********
:: -base    : Should be follow by a string which will be used as base name for files
:: -ext     : Should be follow by a string representing the extension file to use. 
::            Default value : jpg
:: -v       : Display every file modifications
:: *****************************

:: Mandatory parameters :
SET folderToUser=%1

:: Optional parameters :
SHIFT
:loop
IF NOT "%1"=="" (
    IF "%1"=="-base" (
        SET base=%2_
        SET baseClean=!base:"=!
        SHIFT
    )
    IF "%1"=="-ext" (
        SET ext=%2
        SHIFT
    )
    IF "%1"=="-v" (
        SET verbose=y
    )
    SHIFT
    GOTO :loop
)

IF NOT DEFINED base (
    SET base=
)
IF NOT DEFINED ext (
    SET ext=jpg
)
IF NOT DEFINED verbose (
    SET verbose=
)

:: Iterator counter
SET /A i=0

:: For each file in the folder of the "ImagesFolderToUse"
FOR %%f IN (%folderToUser%\*.!ext!) DO (
    :: Increment the counter
    SET /A i=!i!+1

    :: If verbose option is on :
    IF DEFINED verbose (
        ECHO %%f : %folderToUser%\!baseClean!!i!.!ext!
    )

    REN "%%f" !base!!i!.!ext!
)