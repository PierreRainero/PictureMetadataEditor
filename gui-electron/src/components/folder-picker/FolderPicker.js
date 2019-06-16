import React from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { isElectronApp } from '../../util/ApplicationModeService';

import './FolderPicker.scss';

/**
 * @description Component to pick a folder using native navigator thanks to Electron
 * @param {string} title Title of the component
 * @param {string} value Current folder path to display
 * @param {function} actionToDo Function to call after choosing a new folder
 * @author Pierre RAINERO
 */
class FolderPicker extends React.Component {
	/**
	 * @description Open dialog modal to pick a folder and returns his path to parent component
	 */
	setSrcFromFolderPicker = () => {
		if (isElectronApp()) {
			const dialog = window.require('electron').remote.dialog;
			dialog.showOpenDialog({ properties: ['openDirectory'] }, (result) => {
				this.props.actionToDo(result);
			});
		} else {
			this.props.actionToDo('');
		}
	}

	/**
	 * @description Render the component
	 */
	render() {
		return (
			<div>
				<h4>
					<small className='text-muted'>{this.props.title}</small>
				</h4>
				<Button
					variant='outline-primary'
					className='button-outlined-primary'
					onClick={this.setSrcFromFolderPicker}
				>
					<FontAwesomeIcon icon={faSearch} />
				</Button>
				<OverlayTrigger
					placement='bottom'
					overlay={
						<Tooltip>
							{this.props.value}
						</Tooltip>
					}
				>
					<span className='folder-displayer help-cursor'>
						{this.props.value}
					</span>
				</OverlayTrigger>
			</div>
		);
	}
}

FolderPicker.defaultProps = {
	title: '',
	value: '',
	actionToDo: () => { }
};

FolderPicker.propTypes = {
	title: PropTypes.string,
	value: PropTypes.string,
	actionToDo: PropTypes.func
};

export default FolderPicker;