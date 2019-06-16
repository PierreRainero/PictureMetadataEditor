import { winRetrieveMetadata } from './RetrieveMetadata';

describe('ImportMetadata Tests', () => {
    /**
     * Checks if winRetrieveMetadata use correct callback according to the execution of the script
     */
	describe('Function : winRetrieveMetadata', () => {
		beforeEach(() => {
			jest.resetModules();
		});

		it('Should used success callback when script sucessfully finished', () => {
			const getAppPathMock = jest.fn();
			const onSuccessMock = jest.fn().mockImplementation((eventName, callback) => { 
				callback(0);
			});
			const spawnMock = jest.fn().mockImplementation(() => {
				return {
					stdout: { on: jest.fn().mockImplementation((eventName, callback) => { 
						callback('1 image files updated');
					})},
					stderr: { on: jest.fn() },
					on: onSuccessMock
				}
			});
			window.require = jest.fn().mockImplementation(() => {
				return { 
					remote: { app: { getAppPath: getAppPathMock } },
					spawn : spawnMock
				};
			});

			const successCallback = jest.fn();
			const errorCallback = jest.fn();
			winRetrieveMetadata('src/folder', 'dest/folder', successCallback, errorCallback);

			expect(successCallback).toBeCalled();
			expect(errorCallback).not.toBeCalled();
		});

		it('Should used error callback when script not sucessfully finished', () => {
			const getAppPathMock = jest.fn();
			const onSuccessMock = jest.fn().mockImplementation((eventName, callback) => { 
				callback(1);
			});
			const spawnMock = jest.fn().mockImplementation(() => {
				return {
					stdout: { on: jest.fn() },
					stderr: { on: jest.fn().mockImplementation((eventName, callback) => { 
						callback('0 image files updated');
					})},
					on: onSuccessMock
				}
			});
			window.require = jest.fn().mockImplementation(() => {
				return { 
					remote: { app: { getAppPath: getAppPathMock } },
					spawn : spawnMock
				};
			});

			const successCallback = jest.fn();
			const errorCallback = jest.fn();
			winRetrieveMetadata('src/folder', 'dest/folder', successCallback, errorCallback);

			expect(successCallback).not.toBeCalled();
			expect(errorCallback).toBeCalled();
		});
	});
	// =======================================
});