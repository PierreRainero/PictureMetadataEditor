import ApplicationModeService from './ApplicationModeService';

// Controls if native calls are possible
let os;
if(ApplicationModeService.isElectronApp()){
    os = window.require('os');
} else {
    os = undefined;
}

/**
 * @description Exposes all needed functions to detect the current OS
 * @author Pierre RAINERO
 */
class OSService {
    /**
     * @description Check if the OS is win32 or win64
     * @returns {boolean} 'true' if the current OS is a Windows, 'false' otherwise
     */
    static isWin() {
        return os && os.platform() === 'win32';;
    }

    /**
     * @description Check if the OS is MacOS
     * @returns {boolean} 'true' if the current OS is a MacOS, 'false' otherwise
     */
    static isMacOS() {
        return os && os.platform() === 'darwin';;
    }

    /**
     * @description Check if OS is Linux
     * @returns {boolean} 'true' if the current OS is a Linux, 'false' otherwise
     */
    static isLinux() {
        return os && os.platform() === 'linux';;
    }
}

export default OSService; 