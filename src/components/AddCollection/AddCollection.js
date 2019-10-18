import React, { Component } from "react";
import config from "../../config";
import TokenService from "../../services/token-service";

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
      title: this.state.title,
    };

    //console.log(this.state);
    fetch(`${config.API_ENDPOINT}/collections`, {
      method: "POST",
      body: JSON.stringify(newCollection),
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
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
    //console.log(this.props)
    return (
      <section className="AddCollectionForm">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="addfcollectiontitle" className="add-collection-label">
            {" "}
            Add Collection
          </label>
          <input
            type="text"
            id="addcollectionname"
            title="addcollectiontitle"
            onChange={this.handleChangeCollectionTitle}
          ></input>
          <button type="submit" className="button">
            Add Collection
          </button>
        </form>
      </section>
    );
  }
}

export default AddCollection;
