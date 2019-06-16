import React from 'react';
import { Card } from 'react-bootstrap';
import { openUrl } from '../../util/ElectronAdapter';

import './AuthorCard.scss';

/**
 * @description Card to indicate where to find the author and the project repository
 * @author Pierre RAINERO
 */
class AuthorCard extends React.Component {
	/**
	 * @description Render the component
	 */
	render() {
		return (
			<Card className='margin-top-1'>
				<Card.Body>
					MIT LICENCE - <a className='primary-link' href='https://github.com/PierreRainero/PictureMetadaEditor'
						onClick={(e) => { openUrl(e, 'https://github.com/PierreRainero/PictureMetadaEditor') }}>Repository GitHub</a>
				</Card.Body>
			</Card>
		);
	}
}


export default AuthorCard;