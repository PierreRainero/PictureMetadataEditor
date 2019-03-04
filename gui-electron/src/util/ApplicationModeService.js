import isElectron from 'is-electron';

/**
 * @description Exposes all needed functions to detects in which mode the ReactJS is
 * @author Pierre RAINERO
 */
class ApplicationModeService {
    /**
     * @description Check if ReactJS is in production mode
     * @returns {boolean} 'true' if the app is in production, 'false' otherwise
     */
    static isProduction() {
        return process.env.NODE_ENV !== 'development';
    }

    /**
     * @description Check if native call are possible
     * @returns {boolean} 'true' if the app runs in Electron, 'false' otherwise
     */
    static isElectronApp() {
        return this.isProduction() && isElectron();
    }
}

export default ApplicationModeService; 