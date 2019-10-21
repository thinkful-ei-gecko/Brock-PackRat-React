import React from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import TokenService from "../../services/token-service";
import "../Item/ItemCss.css";

export default class Item extends React.Component {
  static defaultProps = {
    onDeleteItem: () => {}
  }

  state = {
    deleteClicked: false
  }

  handleClickDelete = e => {
    e.preventDefault();

    const itemId = this.props.id;
    //console.log(this.props);

    fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return;
      })
      .then(() => {
        console.log(this.props)
        this.props.onDeleteItem(itemId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  deleteMessage() {
    this.setState({
      deleteClicked: !this.state.deleteClicked
    })
  }

  render() {
    const { name, id } = this.props;
    return (
      <div className="Item">
        <h2 className="ItemTitle">
          <Link to={`/item/${id}`}>{name}</Link>
        </h2>
        {this.state.deleteClicked && 
          <div className="ConfirmAlert">
            <p>Are You Sure you want to delete {name}?</p>
            <button className="YesButton" onClick={e => this.handleClickDelete(e)}>Yes</button>
            <button className="NoButton" onClick={this.deleteMessage.bind(this)}>No</button>
          </div>
        }
        <div className="ItemDeleteButtonWrapper">
          <button
            className="ItemDeleteButton"
            type="button"
            onClick={this.deleteMessage.bind(this)}
          >
            Delete Item
          </button>
        </div>
      </div>
    );
  }
}
