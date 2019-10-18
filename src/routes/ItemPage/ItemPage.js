import React from "react";
import config from "../../config";
import Img from 'react-image';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';

export default class ItemPage extends React.Component {
  static defaultProps = {};

  state = {
    item: {}
  };

  componentDidMount() {
    console.log(this.props.match.params);

    Promise.all([
      fetch(`${config.API_ENDPOINT}/items/item/${this.props.match.params.item_id}`, {
        headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
      }),
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
        <Link
          to={{
            pathname: "/update",
            state: { item: this.state.item }
          }}
          className="Item__edit"
          type="button"
          item={this.state.item}
        >
          <button>Edit Item
          </button>
        </Link>
      </div>
    );
  }
}
