import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import FolderPicker from '../folder-picker/FolderPicker';
import OSService from '../../util/OSService';
import RetrieveMetadata from './RetrieveMetadata';

import './ImportMetadata.scss';

/**
 * @description Card exposing the retrieve_metadata feature
 * @author Pierre RAINERO
 */
class ImportMetadata extends React.Component {
    /**
     * @description Normal constructor
     * @param {object} props default props to build the component
     */
    constructor(props) {
        super(props);

        this.state = {
            src: '',
            dest: '',
            loading: false,
            sucessOutput: -1,
            errorOutput: ''
        }
    }

    /**
     * @description Update the source folder path
     */
    setSrcFromFolderPicker = (folderPath) => {
        this.setState({ src: folderPath });
    }

    /**
     * @description Update the destination folder path
     */
    setDestFromFolderPicker = (folderPath) => {
        this.setState({ dest: folderPath });
    }

    /**
     * @description Check if source and destination path are corrects
     * @returns {boolean} 'true' if both are not empty, 'false' otherwise
     */
    isValid = () => {
        return this.state.src !== '' && this.state.dest !== '' && !this.state.loading;
    }

    /**
     * @description Trigger the retrieve_metadata script, copying all metadata of image files in source folder to image files in destination folder
     */
    importMetadata = () => {
        this.setState({ loading: true });
        if (OSService.isWin()) {
            RetrieveMetadata.winRetrieveMetadata(
                this.state.src,
                this.state.dest,
                (data) => {
                    this.setState({ sucessOutput: (data.match(/1 image files updated/g) || []).length, errorOutput: '', loading: false });
                },
                (data) => {
                    this.setState({ sucessOutput: -1, errorOutput: data, loading: false });
                }
            );
        }
    }

    /**
     * @description Render the component
     */
    render() {
        let ouput;

        if (this.state.sucessOutput >= 0) {
            ouput = <p className={`${this.state.sucessOutput === 0 ? 'text-warning' : 'text-success'}`}>
                <FontAwesomeIcon icon={faCheck} />
                <span> {`${this.state.sucessOutput} image files updated.`}</span>
            </p>;
        } else if (this.state.errorOutput !== '') {
            ouput = <p className='text-danger'>
                <FontAwesomeIcon icon={faTimes} />
                <span> {this.state.errorOutput}</span>
            </p>;
        }

        return (
            <Card>
                <Card.Body>
                    <h1 className='text-primary'>
                        Import metadata
                        </h1>

                    <div className='text-left'>
                        <FolderPicker title='Source folder' value={this.state.src} actionToDo={this.setSrcFromFolderPicker} />
                        <hr className='margin-bot-2' />
                        <FolderPicker title='Destination folder' value={this.state.dest} actionToDo={this.setDestFromFolderPicker} />

                        <div className='validation-zone'>
                            <Button
                                variant='outline-success'
                                className={`button-outlined-sucess ${!this.isValid() ? 'disabled-cursor' : ''}`}
                                onClick={this.importMetadata}
                                disabled={!this.isValid()}
                            >
                                {this.state.loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faDownload} />}
                                <span>
                                    {this.state.loading ? ' Loading...' : ' Import'}
                                </span>
                            </Button>
                            {ouput}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default ImportMetadata;