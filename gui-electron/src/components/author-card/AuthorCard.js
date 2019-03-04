import React from 'react';
import { Card } from 'react-bootstrap';
import ApplicationModeService from '../../util/ApplicationModeService';

import './AuthorCard.scss';

/**
 * @description Card to indicate where to find the author and the project repository
 * @author Pierre RAINERO
 */
class AuthorCard extends React.Component {
  /**
   * @description Open a link (distant URL). If the application is in web mode it will navigate to the url, in Electron mode it will open url in browser.
   * @param {object} event Click event catched
   * @param {string} url URL to use
   */
  openLink = (event, url) => {
    if (ApplicationModeService.isElectronApp()) {
      const shell = window.require('electron').remote.shell;
      shell.openExternal(url);
      event.preventDefault();
    }
  }

  /**
   * @description Render the component
   */
  render() {
    return (
      <Card className='margin-top-1'>
        <Card.Body>
        <a className='primary-link' href='https://pierre-rainero.fr/'
          onClick={(e) => {this.openLink(e, 'https://pierre-rainero.fr/')}}>Pierre RAINERO</a> - 
          MIT LICENCE - <a className='primary-link' href='https://github.com/PierreRainero/PictureMetadaEditor'
          onClick={(e) => {this.openLink(e, 'https://github.com/PierreRainero/PictureMetadaEditor')}}>Repository GitHub</a>
        </Card.Body>
      </Card>
    );
  }
}


export default AuthorCard;