import React, { Component } from "react";
import config from "../../config";
import TokenService from '../../services/token-service';

export default class UpdateItem extends Component {

  state = {
    item: '',
    title: {
      value: this.props.location.state.item.title,
      touched: false
    },
    info: {
      value: this.props.location.state.item.info,
      touched: false
    },
    year_released: {
      value: this.props.location.state.item.year_released,
      touched: false
    },
    image_url: {
      value: this.props.location.state.item.image_url,
      touched: false
    }
  }

  handleUpdateItemTitle = e => {
    this.setState({ title: { value: e.target.value, touched: true } });
  };

  handleUpdateItemInfo = e => {
    this.setState({ info: { value: e.target.value, touched: true } });
  };

  handleUpdateItemYear = e => {
    this.setState({ year_released: { value: Number(e.target.value), touched: true } });
  };

  handleUpdateItemImage = e => {
    this.setState({ image_url: { value: e.target.value, touched: true } });
  };

  handleUpdateSubmit = e => {
    e.preventDefault();
    const newUpdatedItem = {
      title: this.state.title.value,
      info: this.state.info.value,
      year_released: this.state.year_released.value,
      image_url: this.state.image_url.value,
      collection_id: parseInt(this.props.location.state.item.collection_id)
    };

    const item_id = this.props.location.state.item.id;
    console.log(item_id)
    console.log(newUpdatedItem)
    fetch(`${config.API_ENDPOINT}/items/${item_id}`, {
      method: "PATCH",
      body: JSON.stringify(newUpdatedItem),
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(error => Promise.reject(error));
      })
      .then(resData => {
        this.setState({
          item: resData
        });
      })
      .then(() => {
        this.props.history.goBack();
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    console.log(this.props.location.state.item.title)
    return (
      <section className="EdititemForm">
        <form>
          <h2>Edit Item</h2>
          <label htmlFor="edititemtitle" className="edit-item-label">
            Item Name
          </label>
          <input
            defaultValue={this.props.location.state.item.title}
            type="text"
            id="edititemtitle"
            name="edititemtitle"
            onChange={this.handleUpdateItemTitle}
          />
          <br />
          <br />
          <label htmlFor="edititemimage" className="edit-item-label">
            Image URL
          </label>
          <input
            defaultValue={this.props.location.state.item.image_url}
            type="text"
            id="edititemimage"
            name="edititemimage"
            onChange={this.handleUpdateItemImage}
          />
          <br />
          <br />
          <label htmlFor="edititemyearreleased" className="edit-item-label">
            Year Released
          </label>
          <br />
          <input
            defaultValue={this.props.location.state.item.year_released}
            type="number"
            id="edititemyearreleased"
            name="edititemyearreleased"
            onChange={this.handleUpdateItemYear}
          />
          <br />
          <br />
          <label htmlFor="itemInfo">Info</label>
          <br />
          <textarea
            value={this.props.location.state.item.info}
            name="itemInfo"
            id="itemInfo"
            onChange={this.handleUpdateItemInfo}
          />
          <br />
          <br />
          <button
            type="submit"
            onClick={this.handleUpdateSubmit}
            className="button"
          >
            Save Item
          </button>
        </form>
      </section>
    );
  }
}
