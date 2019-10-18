import React from "react";
import config from "../../config";
import Img from 'react-image';

export default class ItemPage extends React.Component {
  static defaultProps = {};

  state = {
    item: {}
  };

  componentDidMount() {
    console.log(this.props.match.params);

    Promise.all([
      fetch(`${config.API_ENDPOINT}/items/item/${this.props.match.params.item_id}`)
    ])
      .then(([itemRes]) => {
        if (!itemRes.ok) return itemRes.json().then(e => Promise.reject(e));
        return Promise.all([itemRes.json()]);
      })
      .then(([item]) => {
        this.setState({ item });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  render() {
    console.log(this.props);
    return (
      <div className="Item">
        <h2 className="Item__title">{this.state.item.title}</h2>
        <Img src={this.state.item.image_url} height="100px" width="auto"/>
        <p>Info: {this.state.item.info}</p>
        <p>Year Released: {this.state.item.year_released}</p>
        <button
          className="Item__delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          Delete
        </button>
        <button
          className="Item__edit"
          type="button"
          onClick={this.handleClickEdit}
        >
          Edit
        </button>
      </div>
    );
  }
}
