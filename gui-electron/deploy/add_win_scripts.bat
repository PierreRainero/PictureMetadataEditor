@ECHO OFF
setlocal EnableDelayedExpansion

:: ****** ADD WINDOWS SCRIPTS TO THE APP ******
:: Version  : 1.0
:: Author   : Pierre RAINERO
:: ********************************************

:: Add electron mandatory files
COPY "..\main.js" "..\build\"
COPY "..\package.json" "..\build\"

:: Create scripts folder if not existing
IF NOT EXIST "..\build\scripts\" MKDIR ..\build\scripts\

:: Copy exiftool.exe and windows scripts
COPY "..\..\windows\add_gps_position.bat" "..\build\scripts\"
COPY "..\..\windows\rename_files.bat" "..\build\scripts\"
COPY "..\..\windows\retrieve_metadata.bat" "..\build\scripts\"