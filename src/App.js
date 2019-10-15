import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import CollectionListPage from './routes/CollectionListPage/CollectionListPage';
//import config from './config';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';
import './App.css';

class App extends Component {
  state = {
    collections: [],
    items: [],
  }

  render() {
    return (
      <div className="App">
        <header className="PackRat-Header">
          <Header />
        </header>
        <main className="PackRat-Main">
          <Switch>
            <Route exact path={'/'} component={CollectionListPage}/> 
            <Route exact path={'/login'} component={LoginPage}/>
            <Route exact path={'/register'} component={RegistrationPage}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default App;