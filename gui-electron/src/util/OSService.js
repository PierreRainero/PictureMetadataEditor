import { isElectronApp } from './ApplicationModeService';

/**
 * @description Exposes all needed functions to detect the current OS
 * @author Pierre RAINERO
 */

/**
 * @description Get current os
 * @returns {object} object containing os description
 */
function getOS() {
	if (isElectronApp()) { // Controls if native calls are possible
		return window.require('os');
	} else {
		return undefined;
	}
}

/**
 * @description Check if the OS is win32 or win64
 * @returns {boolean} 'true' if the current OS is a Windows, 'false' otherwise
 */
export function isWin() {
	const os = getOS();
	return os !== undefined && os.platform() === 'win32';
}

/**
 * @description Check if the OS is MacOS
 * @returns {boolean} 'true' if the current OS is a MacOS, 'false' otherwise
 */
export function isMacOS() {
	const os = getOS();
	return os !== undefined && os.platform() === 'darwin';
}

/**
 * @description Check if OS is Linux
 * @returns {boolean} 'true' if the current OS is a Linux, 'false' otherwise
 */
export function isLinux() {
	const os = getOS();
	return os !== undefined && os.platform() === 'linux';
}