import React from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import TokenService from "../../services/token-service";
import '../Item/ItemCss.css';

export default class Item extends React.Component {
  static defaultProps = {
    onDeleteItem: () => {}
  };

  handleClickDelete = e => {
    e.preventDefault();

    const itemId = this.props.id;
    console.log(this.props)

    fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
      method: "DELETE",
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return;
      })
      .then(() => {
        this.props.onDeleteItem(itemId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { name, id } = this.props;
    return (
      <div className="Item">
        <h2 className="Item__title">
          <Link to={`/item/${id}`}>{name}</Link>
        </h2>
        <div className="ItemDeleteButtonWrapper">
          <button
            className="ItemDeleteButton"
            type="button"
            onClick={e => window.confirm('Are you sure you wish to delete this item?') && this.handleClickDelete(e) }
          >
            Delete Item
          </button>
        </div>
      </div>
    );
  }
}
