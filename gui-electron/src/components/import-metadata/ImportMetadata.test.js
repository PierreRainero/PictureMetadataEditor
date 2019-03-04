import React from 'react';
import ReactDOM from 'react-dom';
import ImportMetadata from './ImportMetadata';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImportMetadata />, div);
  ReactDOM.unmountComponentAtNode(div);
});
// =======================================