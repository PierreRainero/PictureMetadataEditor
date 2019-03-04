import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import FolderPicker from './FolderPicker';

/**
 * Checks if the component can be rendered
 */
it('Should renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FolderPicker />, div);
  ReactDOM.unmountComponentAtNode(div);
});
// =======================================

/**
 * Checks behaviors
 */
it('Should executes given function', () => {
  let passed = 0;
  const div = document.createElement('div');
  const component = ReactDOM.render(<FolderPicker
    actionToDo={(stringPassed) => {
      expect(stringPassed).toEqual('');
      passed++;
    }}
  />, div);
  expect(passed).toEqual(0);

  const buttonNode = component.refs['search-button'];
  ReactTestUtils.Simulate.click(buttonNode);

  expect(passed).toEqual(1);

  ReactDOM.unmountComponentAtNode(div);
});
// =======================================