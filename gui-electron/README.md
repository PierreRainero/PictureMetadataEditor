# Graphical User Interface

## Description

In order to simply the interactions for users there is an GUI for the application. I used "[ReactJS](https://reactjs.org/)" coupled with "[Electron](https://electronjs.org/)". The application is an installed executable file completely autonomous.  
In order to make the application works you have to install "[NodeJS](https://nodejs.org/)" on your computer and follow the installation according to your OS.

## Installation

- [Windows](###Windows) ✔️  
- Linux ❌  
- MacOS ❌  

### Windows

🛈 Each steps might takes couple of time, take a coffee and wait until it finished.

1. Use command `npm i` to get all needed packages to build the app ;
2. Use command `npm run build-update` to build the static website that will be used by the application ;

    ```text
    > picturemetadaeditor@0.1.0 build-update D:\Donnees\Informatique\Projets\PictureMetadataEditor\gui-electron
    > react-scripts build

    Creating an optimized production build...
    Compiled successfully.
    ```

3. Use command `npm run build-win-app` to install the app on your Windows computer (x64). This will create a folder "/app/windows/PictureMetadaEditor-win32-x64" which contains the application. You juste have to double-clicks on the file named "PictureMetadaEditor.exe" inside this folder.

    ```text
    > picturemetadaeditor@0.1.0 build-win-app D:\Donnees\Informatique\Projets\PictureMetadataEditor\gui-electron
    > electron-packager . PictureMetadaEditor --platform win32 --arch x64 --out app/windows

    Packaging app for platform win32 x64 using electron v4.0.6
    Wrote new app to app\windows\PictureMetadaEditor-win32-x64
    ```

## Details

You may be interested in other commands (if you are a developer for example). The project exposes the following commands :  

- `npm run react-test` : Launches all tests of the React application (use `a` after this command to forces all tests to be executed).