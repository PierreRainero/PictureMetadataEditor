import { isProduction } from './ApplicationModeService';

describe('ApplicationModeService Tests', () => {
    /**
     * Checks if isProduction correctly reconize the env
     */
	describe('Function : isProduction', () => {
		beforeEach(() => {
			jest.resetModules();
		});
		afterEach(() => {
			delete process.env.NODE_ENV;
		});

		it('Should reconize prod env', () => {
			process.env.NODE_ENV = 'production';
			expect(isProduction()).toEqual(true);
		});

		it('Should reconize dev env', () => {
			process.env.NODE_ENV = 'development';
			expect(isProduction()).toEqual(false);
		});
	});
	// =======================================
});