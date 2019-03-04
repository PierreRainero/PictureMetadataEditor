import React from 'react';
import ReactDOM from 'react-dom';
import AuthorCard from './AuthorCard';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AuthorCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});
// =======================================