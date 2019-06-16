import { isElectronApp } from './ApplicationModeService';
/**
 * @description Exposes functions corresponding to modified behavior between a browser and an Electron app
 * @author Pierre RAINERO
 */

/**
 * @description Open a link (distant URL). If the application is in web mode it will navigate to the url, in Electron mode it will open url in browser.
 * @param {object} event Click event catched
 * @param {string} url URL to use
 */
export function openUrl(event, url) {
	if (isElectronApp()) {
		const shell = window.require('electron').remote.shell;
		shell.openExternal(url);
		event.preventDefault();
	}
}