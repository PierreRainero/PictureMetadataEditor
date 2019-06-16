import React from 'react';
import { mount } from 'enzyme';
import ImportMetadata from './ImportMetadata';
import * as OSService from '../../util/OSService';
import * as RetrieveMetadata from './RetrieveMetadata';

describe('ImportMetadata Tests', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	/**
	 * Checks if the component can be rendered
	 */
	it('Should renders without crashing', () => {
		const component = mount(<ImportMetadata />);

		expect(component).toBeTruthy();
		component.unmount();
	});
	// =======================================

	/**
	 * Checks validity before start import
	 */
	it('Should allows import only if src and dest folder are knew', () => {
		const component = mount(<ImportMetadata />);
		expect(component.instance().isValid()).toEqual(false);

		component.instance().setSrcFromFolderPicker('src/folder');
		expect(component.instance().isValid()).toEqual(false);

		component.instance().setDestFromFolderPicker('dest/folder');
		expect(component.instance().isValid()).toEqual(true);

		component.instance().setSrcFromFolderPicker('');
		expect(component.instance().isValid()).toEqual(false);
	});

	it('Shouldn\'t allows import if component is loading', () => {
		const component = mount(<ImportMetadata />);
		component.instance().setSrcFromFolderPicker('src/folder');
		component.instance().setDestFromFolderPicker('dest/folder');
		expect(component.instance().isValid()).toEqual(true);

		component.instance().setState({loading: true});
		expect(component.instance().isValid()).toEqual(false);
	});
	// =======================================

	/**
	 * Checks behaviors
	 */
	it('Should display number of images updated when script executed fine', () => {
		const successOne = '1 image files updated';
		OSService.isWin = jest.fn().mockImplementation(() => {
			return true;
		});
		RetrieveMetadata.winRetrieveMetadata = jest.fn().mockImplementation((src, dest, success) => {
			success(successOne+'\n'+successOne+'\n'+successOne);
		});

		const component = mount(<ImportMetadata />);
		component.instance().setSrcFromFolderPicker('src/folder');
		component.instance().setDestFromFolderPicker('dest/folder')

		let successMessage = component.find('p.text-success');
		expect(successMessage.length).toEqual(0);

		const importButton = component.find('button.button-outlined-success');
		importButton.first().simulate('click');
		successMessage = component.find('p.text-success');
		expect(successMessage.length).toEqual(1);
		expect(successMessage.first().text().trim()).toEqual('3 image files updated.');
	});

	it('Should display number of images updated as a warning when script updated 0 image', () => {
		const successOne = '';
		OSService.isWin = jest.fn().mockImplementation(() => {
			return true;
		});
		RetrieveMetadata.winRetrieveMetadata = jest.fn().mockImplementation((src, dest, success) => {
			success(successOne+'\n'+successOne+'\n'+successOne);
		});

		const component = mount(<ImportMetadata />);
		component.instance().setSrcFromFolderPicker('src/folder');
		component.instance().setDestFromFolderPicker('dest/folder')

		let successMessage = component.find('p.text-success');
		expect(successMessage.length).toEqual(0);
		let warningMessage = component.find('p.text-warning');
		expect(warningMessage.length).toEqual(0);

		const importButton = component.find('button.button-outlined-success');
		importButton.first().simulate('click');
		successMessage = component.find('p.text-success');
		expect(successMessage.length).toEqual(0);
		warningMessage = component.find('p.text-warning');
		expect(warningMessage.length).toEqual(1);
		expect(warningMessage.first().text().trim()).toEqual('0 image files updated.');
	});

	it('Should display error message when script not executed fine', () => {
		const scriptError = 'Some errors occured !';
		OSService.isWin = jest.fn().mockImplementation(() => {
			return true;
		});
		RetrieveMetadata.winRetrieveMetadata = jest.fn().mockImplementation((src, dest, success, error) => {
			error(scriptError);
		});

		const component = mount(<ImportMetadata />);
		component.instance().setSrcFromFolderPicker('src/folder');
		component.instance().setDestFromFolderPicker('dest/folder')

		let errorMessage = component.find('p.text-danger');
		expect(errorMessage.length).toEqual(0);

		const importButton = component.find('button.button-outlined-success');
		importButton.first().simulate('click');
		errorMessage = component.find('p.text-danger');
		expect(errorMessage.length).toEqual(1);
		expect(errorMessage.first().text().trim()).toEqual(scriptError);
	});

	it('Should not executed script if not under win/mac/linux', () => {
		OSService.isWin = jest.fn().mockImplementation(() => {
			return false;
		});
		const mockToUse = jest.fn()
		RetrieveMetadata.winRetrieveMetadata = mockToUse;

		const component = mount(<ImportMetadata />);
		component.instance().setSrcFromFolderPicker('src/folder');
		component.instance().setDestFromFolderPicker('dest/folder')

		const importButton = component.find('button.button-outlined-success');
		importButton.first().simulate('click');
		
		expect(mockToUse).not.toBeCalled();
	});
	// =======================================
});