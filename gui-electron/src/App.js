import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ImportMetadata from './components/import-metadata/ImportMetadata';
import AuthorCard from './components/author-card/AuthorCard';
import './App.scss';

/**
 * @description Main container for the application
 * @author Pierre RAINERO
 */
class App extends Component {
  /**
    * @description Render the component
    */
  render() {
    return (
      <div className='App'>
        <Container className='container'>
          <ImportMetadata />
          <AuthorCard />
        </Container>
      </div>
    );
  }
}

export default App;
