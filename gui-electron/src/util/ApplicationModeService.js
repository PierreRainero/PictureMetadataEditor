import isElectron from 'is-electron';

/**
 * @description Exposes all needed functions to detects in which mode the ReactJS is
 * @author Pierre RAINERO
 */

/**
 * @description Check if ReactJS is in production mode
 * @returns {boolean} 'true' if the app is in production, 'false' otherwise
 */
export function isProduction() {
	return process.env.NODE_ENV !== 'development';
}

/**
 * @description Check if native call are possible
 * @returns {boolean} 'true' if the app runs in Electron, 'false' otherwise
 */
export function isElectronApp() {
	return isProduction() && isElectron();
}