import React from "react";
import { Link } from "react-router-dom";
import { getItemsForCollection } from "../../items-helpers";
import config from "../../config";
import Item from "../../components/Item/Item";
import "../ItemListPage/ItemListPage.css";
import Img from "react-image";
import TokenService from "../../services/token-service";

export default class ItemListPage extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      items: [],
      filtered: [],
      deleteClicked: false,
    };
  }

  updateSearch(event) {
    this.setState({ filtered: event.target.value.substr(0, 20) });
  }

  onDeleteCollection = collection_id => {
    this.setState({
      collections: this.state.collections.filter(
        collection => collection.id !== collection_id
      )
    });
  };

  onDeleteItem = item_id => {
    console.log(item_id)
    this.setState({
      items: this.state.items.filter(
        item => item.id !== item_id
      )
    });
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/collections`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/items`)
    ])
      .then(([collectionsRes, itemsRes]) => {
        if (!collectionsRes.ok)
          return collectionsRes.json().then(e => Promise.reject(e));
        if (!itemsRes.ok) return itemsRes.json().then(e => Promise.reject(e));
        return Promise.all([collectionsRes.json(), itemsRes.json()]);
      })
      .then(([collections, items]) => {
        this.setState({ collections, items });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteCollection = e => {
    e.preventDefault();

    const collection_id = this.props.match.params.collection_id;
    //console.log(this.props);

    fetch(`${config.API_ENDPOINT}/collections/${collection_id}`, {
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
        this.onDeleteCollection(collection_id);
      })
      .then(() => {
        this.props.history.goBack();
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
    const { collection_id } = this.props.match.params;
    const itemsForCollection = getItemsForCollection(
      this.state.items,
      collection_id
    ).filter(item => {
      return item.title.toLowerCase().indexOf(this.state.filtered) !== -1;
    });
    //console.log(this.props)
    return (
      <section className="ItemListMain">
        <div className="SearchContainer">
          <input
            type="text"
            className="input"
            placeholder="Search..."
            onChange={this.updateSearch.bind(this)}
          />
          <ul></ul>
        </div>
        {this.state.deleteClicked && 
          <div className="ConfirmAlert">
            <p>Are you sure you want to delete this collection??</p>
            <button className="YesButton" onClick={e => this.handleDeleteCollection(e)}>Yes</button>
            <button className="NoButton" onClick={this.deleteMessage.bind(this)}>No</button>
          </div>
        }
        <div className="ButtonContainer">
          <div className="ItemListMainButtonContainer">
            <button
              onClick={this.deleteMessage.bind(this)}
              type="button"
              className="DeleteCollectionButton"
            >
              Delete Entire Collection
            </button>
          </div>
          <div className="ItemListMainButtonContainer">
            <Link
              tag={Link}
              to={{
                pathname: "/add-item",
                state: { collection_id: collection_id }
              }}
              type="button"
              className="ItemListMainAddItemButton"
            >
              Add Item
            </Link>
          </div>
        </div>
        <ul className="ItemsListContainer">
          {itemsForCollection.map(item => (
            <li className="ItemInCollection" key={item.id}>
              <Img src={item.image_url} height="146px" width="146px" />
              <Item
                id={item.id}
                name={item.title}
                collection_id={item.collection_id}
                onDeleteItem={this.onDeleteItem}
                image_url={item.image_url}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}
