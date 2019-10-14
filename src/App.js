import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
//import CollectionListPage from './components/CollectionListPage/CollectionListPage';
//import config from './config';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';

class App extends Component {
  state = {
    collections: [],
    items: [],
  }

  /* componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/collections`),
      fetch(`${config.API_ENDPOINT}/item`)
    ])
    .then (([collectionsRes, itemsRes]) => {
      if (!collectionsRes.ok)
        return collectionsRes.json().then(e => Promise.reject(e));
      if (!itemsRes.ok)
        return itemsRes.json().then(e => Promise.reject(e));
      return Promise.all([collectionsRes.json(), itemsRes.json()]);
    })
    .then(([collections, items]) => {
      this.setState({collections, items})
    })
    .catch(error => {
      console.error({error});
    })
  } */

  render() {
    return (
      <div className="App">
        <header className="PackRat-Header">
          <Header />
        </header>
        <main className="PackRat-Main">
          <Switch>
            {/* <Route exact path={'/'} component={CollectionListPage}/> */}
            <Route exact path={'/login'} component={LoginPage}/>
            <Route exact path={'/register'} component={RegistrationPage}/>
          </Switch>
        </main>
      </div>
    )
  }
}

export default App;