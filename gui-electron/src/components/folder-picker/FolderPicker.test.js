import React from 'react';
import { mount } from 'enzyme';
import FolderPicker from './FolderPicker';
import * as ApplicationModeService from '../../util/ApplicationModeService';

describe('FolderPicker Tests', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	/**
	 * Checks if the component can be rendered
	 */
	it('Should renders without crashing', () => {
		const component = mount(<FolderPicker />);

		expect(component).toBeTruthy();
		component.unmount();
	});
	// =======================================

	/**
	 * Checks behaviors
	 */
	it('Should executes given function', () => {
		let passed = 0;
		const component = mount(<FolderPicker actionToDo={
			(stringPassed) => {
				expect(stringPassed).toEqual('');
				passed++;
			}}
		/>);
		expect(passed).toEqual(0);

		const button = component.find('button.button-outlined-primary');
		button.first().simulate('click');

		expect(passed).toEqual(1);
	});

	it('Should executes default function if no one is given', () => {
		let passed = 0;
		const component = mount(<FolderPicker />);
		expect(passed).toEqual(0);

		const button = component.find('button.button-outlined-primary');
		button.first().simulate('click');

		expect(passed).toEqual(0);
	});

	it('Should uses showOpenDialog to select folder under electron app', () => {
		const pathSelected = 'some/folder';
		const mockToUse = jest.fn().mockImplementation((properties, callback) => {
			callback(pathSelected);
		});
		window.require = jest.fn().mockImplementation(() => {
			return { remote: { dialog: { showOpenDialog: mockToUse } } };
		});
		ApplicationModeService.isElectronApp = jest.fn().mockImplementation(() => {
			return true;
		});
		let passed = 0;
		const component = mount(<FolderPicker actionToDo={
			(stringPassed) => {
				expect(stringPassed).toEqual(pathSelected);
				passed++;
			}}
		/>);
		expect(passed).toEqual(0);

		const button = component.find('button.button-outlined-primary');
		button.first().simulate('click');

		expect(mockToUse).toBeCalled();
		expect(passed).toEqual(1);
	});
	// =======================================
});