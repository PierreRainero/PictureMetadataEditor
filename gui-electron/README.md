# Graphical User Interface

## Description

In order to simply the interactions for users there is an GUI for the application. I used "[ReactJS](https://reactjs.org/)" coupled with "[Electron](https://electronjs.org/)". The application is an installed executable file completely autonomous.  
In order to make the application works you have to install "[NodeJS](https://nodejs.org/)" on your computer and follow the installation according to your OS.  
Thanks to [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) to compile this application. ❤️

## Installation

- [Windows](###Windows) ✔️  
- Linux ❌  
- MacOS ❌  

### Windows

🛈 Each steps might takes couple of time, take a coffee and wait until it finished.

1. Use command `npm i` to get all needed packages to build the app ;
2. Use command `npm run build-update` to build the static website that will be used by the application ;

    ```text
    > picturemetadaeditor@1.0.0 build-update D:\Donnees\Informatique\Projets\PictureMetadataEditor\gui-electron
    > webpack --display=minimal --mode production

      194 modules
    ```

3. Use command `npm run build-win-app` to install the app on your Windows computer (x64). This will create a folder "/app/windows/PictureMetadaEditor-win32-x64" which contains the application. You juste have to double-clicks on the file named "PictureMetadaEditor.exe" inside this folder.

    ```text
    > picturemetadaeditor@1.0.0 build-win-app D:\Donnees\Informatique\Projets\PictureMetadataEditor\gui-electron
    > electron-packager . PictureMetadaEditor --platform win32 --arch x64 --out app/windows

    Packaging app for platform win32 x64 using electron v4.0.6
    Wrote new app to app\windows\PictureMetadaEditor-win32-x64
    ```

## Details

### Commands

You may be interested in other commands (if you are a developer for example). The project exposes the following commands :  

- `npm run test` : Launches all tests of the React application using [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/).  
- `npm run test:coverage` : Same as `npm test` but generate a complete coverage report under folder named "_coverage_".  
- `npm run lint` : Run the linter [eslint](https://eslint.org/) in order to check if the code has a correct syntax.  

⚠️ If you want to contribute to this project keep in mind commands `lint` and `test` will be called to validate your contribution so test them before make any pull request. You have to ensure tests written before your contribution are keep working and you have to test your code. For a file name _myNewComponent.js_ write in the same folder _myNewComponent.test.js_ testing UI behaviors.

### GUI Project structure

```text
├── src                                            : Source code folder
│    ├── components                                : Components folder
│    │     └── myComponent                         : Dedicated component folder (isoled)
│    │          ├── myComponent.js                 : Component source code
|    │          ├── myComponent.scss               : Dedicated component style
|    │          └── myComponent.test.js            : Component tests
|    ├── styles                                    : Styles shared between components
|    └── util                                      : Services/Configs shared between components
└── public                                         : Folder containing assets not compress/uglified
```
