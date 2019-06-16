/**
 * @description Exposes all possible ways to call scripts responsible of retrieving metadata
 * @author Pierre RAINERO
 */

/**
 * @description Import all metadata from 'src' folder to 'dest' folder. Images must have same name.
 *              [WARNING] Call this function only on Windows device
 * @param {string} src Absolute path of images source folder
 * @param {string} dest Absolute path of images destination folder
 * @param {function} successCallBack Function to call after the script successfully executes
 * @param {function} errorCallback Function to call if the script finish with an error
 */
export function winRetrieveMetadata(src, dest, successCallBack, errorCallback) {
	const app = window.require('electron').remote.app;
	const { spawn } = window.require('child_process');
	let result = '';
	const command = spawn(app.getAppPath() + '\\scripts\\retrieve_metadata.bat', [src, dest]);

	command.stdout.on('data', (data) => {
		result += data.toString();
	});
	command.stderr.on('data', (data) => {
		result += data.toString();
	});

	command.on('close', (code) => {
		if (code === 0) {
			return successCallBack(result);
		} else {
			return errorCallback(result);
		}
	});
}
