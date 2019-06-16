import * as ApplicationModeService from './ApplicationModeService';
import { isWin, isMacOS, isLinux } from './OSService';

describe('OSService Tests', () => {
    /**
     * Checks if isWin only reconize windows OS under electron
     */
	describe('Function : isWin', () => {
		beforeEach(() => {
			jest.resetModules();
		});

		it('Should accepted win32', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return true;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'win32';
					}
				};
			});

			expect(isWin()).toEqual(true);
		});

		it('Shouldn\'t accepted darwin', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return true;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'darwin';
					}
				};
			});

			expect(isWin()).toEqual(false);
		});

		it('Shouldn\'t accepted linux', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return true;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'linux';
					}
				};
			});

			expect(isWin()).toEqual(false);
		});

		it('Should anwer false when not in electron', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return false;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'win32';
					}
				};
			});

			expect(isWin()).toEqual(false);
		});
	});
	// =======================================

    /**
     * Checks if isMacOS only reconize mac OS under electron
     */
	describe('Function : isMacOS', () => {
		beforeEach(() => {
			jest.resetModules();
		});

		it('Shouldn\'t accepted win32', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return true;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'win32';
					}
				};
			});

			expect(isMacOS()).toEqual(false);
		});

		it('Should accepted darwin', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return true;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'darwin';
					}
				};
			});

			expect(isMacOS()).toEqual(true);
		});

		it('Shouldn\'t accepted linux', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return true;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'linux';
					}
				};
			});

			expect(isMacOS()).toEqual(false);
		});

		it('Should anwer false when not in electron', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return false;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'darwin';
					}
				};
			});

			expect(isMacOS()).toEqual(false);
		});
	});
	// =======================================

    /**
     * Checks if isLinux only reconize linux OS under electron
     */
	describe('Function : isLinux', () => {
		beforeEach(() => {
			jest.resetModules();
		});

		it('Shouldn\'t accepted win32', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return true;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'win32';
					}
				};
			});

			expect(isLinux()).toEqual(false);
		});

		it('Shouldn\'t accepted darwin', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return true;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'darwin';
					}
				};
			});

			expect(isLinux()).toEqual(false);
		});

		it('Should accepted linux', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return true;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'linux';
					}
				};
			});

			expect(isLinux()).toEqual(true);
		});

		it('Should anwer false when not in electron', () => {
			ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
				return false;
			});
			window.require = jest.fn().mockImplementation(() => {
				return {
					platform: function () {
						return 'linux';
					}
				};
			});

			expect(isLinux()).toEqual(false);
		});
	});
	// =======================================
});