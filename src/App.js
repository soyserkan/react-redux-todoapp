import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import HomePage from './components/HomePage'
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Route path='/' component={HomePage}></Route>
        </Container>
      </div>
    );
  }
}

export default App;
