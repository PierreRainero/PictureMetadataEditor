import React from 'react';
import { mount } from 'enzyme';
import AuthorCard from './AuthorCard';
import * as ElectronAdapter from '../../util/ElectronAdapter';

describe('AuthorCard Tests', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	/**
	 * Checks if the component can be rendered
	 */
	it('Should renders without crashing', () => {
		const component = mount(<AuthorCard />);

		expect(component).toBeTruthy();
		component.unmount();
	});
	// =======================================

	/**
	 * Checks behaviors
	 */
	it('Should uses openUrl service', () => {
		const mockToUse = jest.fn();
		ElectronAdapter.openUrl = mockToUse;

		const component = mount(<AuthorCard />);
		const link = component.find('CardBody>div>a');
		link.first().simulate('click');

		expect(mockToUse).toBeCalled();
	});
	// =======================================
});