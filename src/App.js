import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import CollectionListPage from './routes/CollectionListPage/CollectionListPage';
import LoginPage from './routes/LoginPage/LoginPage';
import RegistrationPage from './routes/RegistrationPage/RegistrationPage';
import './App.css';
import ItemListPage from './routes/ItemListPage/ItemListPage';
import ItemPage from './routes/ItemPage/ItemPage'

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
            {['/collection/:collection_id'].map(path => (
              <Route
                exact
                key={path}
                path={path}
                component={ItemListPage}
                />
            ))}
            {['/item/:item_id'].map(path => (
              <Route
                exact
                key={path}
                path={path}
                component={ItemPage}
                />
            ))}
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