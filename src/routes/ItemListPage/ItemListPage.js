import React from "react";
import { Link } from "react-router-dom";
import { getItemsForCollection } from "../../items-helpers";
import config from "../../config";
import Item from "../../components/Item/Item";
import "../ItemListPage/ItemListPage.css";
import Img from "react-image";
import TokenService from '../../services/token-service';

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
      filtered: []
    };
  }

  updateSearch(event) {
    this.setState({ filtered: event.target.value.substr(0, 20) });
  }

  onDeleteCollection = collection_id => {
    this.setState({
      collections: this.state.collections.filter(collection => collection.id !== collection_id)
    });
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/collections`, {
        headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
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
    console.log(this.props)

    fetch(`${config.API_ENDPOINT}/collections/${collection_id}`, {
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
        this.onDeleteCollection(collection_id);
      })
      .then(() => {
        this.props.history.goBack();
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    console.log(this.props.match.params.collection_id)
    const { collection_id } = this.props.match.params;
    const itemsForCollection = getItemsForCollection(
      this.state.items,
      collection_id
    ).filter(item => {
      return item.title.toLowerCase().indexOf(this.state.filtered) !== -1;
    });
    return (
      <section className="ItemListMain">
        <div className="searchContainer">
          <input
            type="text"
            className="input"
            placeholder="Search..."
            onChange={this.updateSearch.bind(this)}
          />
          <ul></ul>
        </div>
        <div className="ItemListMain__button-container">
          <button
            onClick={e => window.confirm('Are you sure you wish to delete this Collection and all of its contents?') && this.handleDeleteCollection(e) }
            type="button" 
            className="ItemListMain__add-item-button">
            Delete Entire Collection
          </button>
        </div>

        <ul>
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
        <div className="ItemListMain__button-container">
          <Link
            tag={Link}
            to={{
              pathname: "/add-item",
              state: { collection_id: collection_id }
            }}
            type="button"
            className="ItemListMain__add-item-button"
          >
            Add Item
          </Link>
        </div>
      </section>
    );
  }
}
