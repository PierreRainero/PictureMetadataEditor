import * as ApplicationModeService from './ApplicationModeService';
import { openUrl } from './ElectronAdapter';

describe('ElectronAdapter Tests', () => {
    /**
     * Checks if openUrl use electron to open a browser
     */
	describe('Function : openUrl', () => {
		beforeEach(() => {
			jest.resetModules();
		});

		it('Should open url in a browser under electron', () => {
			const mockToUse = jest.fn();
			window.require = jest.fn().mockImplementation(() => {
				return { remote: { shell: { openExternal: mockToUse } } };
			});
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return true;
			});

			const event = document.createEvent('UIEvents');
			const url = 'http://someurl.com';
			openUrl(event, url);

			expect(mockToUse).toBeCalled();
			expect(mockToUse).toBeCalledWith(url);
		});

		it('Should not change behavior under a browser', () => {
			const mockToUse = jest.fn();
			window.require = jest.fn().mockImplementation(() => {
				return { remote: { shell: { openExternal: mockToUse } } };
			});
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return false;
			});

			const event = document.createEvent('UIEvents');
			const url = 'http://someurl.com';
			openUrl(event, url);

			expect(mockToUse).not.toBeCalled();
		});
	});
	// =======================================
});