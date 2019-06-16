import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App Tests', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	/**
	 * Checks if the component can be rendered
	 */
	it('Should renders without crashing', () => {
		const component = shallow(<App />);

		expect(component).toBeTruthy();
	});
	// =======================================
}); 