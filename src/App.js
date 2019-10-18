import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import CollectionListPage from "./routes/CollectionListPage/CollectionListPage";
import LoginPage from "./routes/LoginPage/LoginPage";
import RegistrationPage from "./routes/RegistrationPage/RegistrationPage";
import "./App.css";
import ItemListPage from "./routes/ItemListPage/ItemListPage";
import ItemPage from "./routes/ItemPage/ItemPage";
import AddCollection from "./components/AddCollection/AddCollection";
import AddItem from "./components/AddItem/AddItem";
import TokenService from "./services/token-service";
import UpdateItem from "./routes/UpdateItem/UpdateItem";

class App extends Component {
  state = {
    user: TokenService.getAuthToken()
  };

  changeUser = user => {
    this.setState({
      user: user
    });
  };

  render() {
    return (
      <div className="App">
        <header className="PackRat-Header">
          <Header user={this.state.user} changeUser={this.changeUser} />
        </header>
        <main className="PackRat-Main">
          <Switch>
            {["/collection/:collection_id"].map(path => (
              <Route exact key={path} path={path} component={ItemListPage} />
            ))}
            {["/item/:item_id"].map(path => (
              <Route exact key={path} path={path} component={ItemPage} />
            ))}
            <Route exact path={"/"} component={CollectionListPage} />
            <Route
              exact
              path={"/login"}
              render={props => (
                <LoginPage {...props} changeUser={this.changeUser} />
              )}
            />
            <Route exact path={"/register"} component={RegistrationPage} />
            <Route exact path={"/add-collection"} component={AddCollection} />
            <Route exact path={"/update"} component={UpdateItem} />
            <Route exact path={"/add-item"} component={AddItem} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
