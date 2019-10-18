import React, { Component } from "react";
import config from "../../config";
import TokenService from "../../services/token-service";

class AddItem extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };

  state = {
    items: [],
    collections: [],
    error: null,
    title: {
      value: "",
      touched: false
    },
    info: {
      value: "",
      touched: false
    },
    year_released: {
      value: "",
      touched: false
    },
    image_url: {
      value: "",
      touched: false
    }
  };

  handleChangeItemTitle = e => {
    this.setState({ title: { value: e.target.value, touched: true } });
  };

  handleChangeItemInfo = e => {
    this.setState({ info: { value: e.target.value, touched: true } });
  };

  handleChangeItemYear = e => {
    this.setState({ year_released: { value: Number(e.target.value), touched: true } });
  };

  handleChangeItemImage = e => {
    this.setState({ image_url: { value: e.target.value, touched: true } });
  };

  handleChangeCollectionId = e => {
    this.setState({ collection_id: { value: Number(e.target.value), touched: true } });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newItem = {
      title: this.state.title.value,
      info: this.state.info.value,
      year_released: this.state.year_released.value,
      image_url: this.state.image_url.value,
      collection_id: parseInt(this.props.location.state.collection_id)
    };

    fetch(`${config.API_ENDPOINT}/items`, {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "content-type": "application/json",
        Authorization: TokenService.getAuthToken()
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
        return res.json();
      })
      .then(resData => {
        this.setState({
          items: resData
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

  validateTitle() {
    const title = this.state.title.value.trim();
    if (title.length === 0) {
      return "Name is required";
    }
  }

  validateInfo() {
    const info = this.state.info.value.trim();
    if (info.length === 0) {
      return "Info is required";
    }
  }

  validateYearReleased() {
    const year_released = this.state.year_released.value;
    if (year_released.length === 0) {
      return "Year Released is required";
    }
  }

  validateImage() {
    const image_url = this.state.image_url.value;
    if (image_url.length === 0) {
      return "Image url is required";
    }
  }

  validateCollectionId() {
    const collection = this.state.collection_id.value;
    if (!collection) {
      return "Must specify an existing collection";
    }
  }

  render() {
    const { collection_id } = this.props.location.state;
    console.dir(collection_id);
    return (
      <section className="AdditemForm">
        <form>
          <h2>Add Item</h2>
          <label htmlFor="additemtitle" className="add-item-label">
            Item Name
          </label>
          <input
            type="text"
            id="additemtitle"
            name="additemtitle"
            onChange={this.handleChangeItemTitle}
          />
          {this.state.title.touched && (
            <div className="error">{this.validateTitle()}</div>
          )}
          <br />
          <br />
          <label htmlFor="additemimage" className="add-item-label">
            Image URL
          </label>
          <input
            type="text"
            id="additemimage"
            name="additemimage"
            onChange={this.handleChangeItemImage}
          />
          {this.state.title.touched && (
            <div className="error">{this.validateImage()}</div>
          )}
          <br />
          <br />
          <label htmlFor="additemyearreleased" className="add-item-label">
            Year Released
          </label>
          <br />
          <input
            type="number"
            id="additemyearreleased"
            name="additemyearreleased"
            onChange={this.handleChangeItemYear}
          />
          {this.state.year_released.touched && (
            <div className="error">{this.validateYearReleased()}</div>
          )}
          <br />
          <br />
          <label htmlFor="itemInfo">Info</label>
          <br />
          <textarea
            name="itemInfo"
            id="itemInfo"
            onChange={this.handleChangeItemInfo}
          />
          {this.state.info.touched && (
            <div className="error">{this.validateInfo()}</div>
          )}
          <br />
          <br />
          <button
            type="submit"
            onClick={this.handleSubmit}
            disabled={
              this.validateTitle() ||
              this.validateYearReleased() ||
              this.validateInfo()
            }
            className="button"
          >
            Add Item
          </button>
        </form>
      </section>
    );
  }
}

export default AddItem;
