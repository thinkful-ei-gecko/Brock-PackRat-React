import React, { Component } from "react";
import config from "../../config";
import TokenService from "../../services/token-service";
import './AddCollection.css';

class AddCollection extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };

  state = {
    title: ""
  };

  handleChangeCollectionTitle = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newCollection = {
      title: this.state.title
    };

    fetch(`${config.API_ENDPOINT}/collections`, {
      method: "POST",
      body: JSON.stringify(newCollection),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
        return res.json();
      })
      .then(resData => {
        this.setState({
          collections: resData
        });
      })
      .then(() => {
        this.props.history.goBack();
      })
      .catch(error => {
        console.error(error);
        this.setState({ error });
      });
  };
  render() {
    return (
      <section className="AddCollectionForm">
        <form onSubmit={this.handleSubmit}>
        <h2 className="CollectionTitle">Add Collection</h2>< br/>
          <label htmlFor="addfcollectiontitle" className="AddCollectionLabel">
            {" "}
            Title
          </label>
          <input
            type="text"
            id="addcollectionname"
            title="addcollectiontitle"
            onChange={this.handleChangeCollectionTitle}
            placeholder="Example Collection"
          ></input>
          <button type="submit" className="CreateNewCollectionButton">
            Create New Collection
          </button>
        </form>
      </section>
    );
  }
}

export default AddCollection;
