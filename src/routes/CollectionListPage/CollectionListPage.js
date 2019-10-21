import React from "react";
import { Link } from "react-router-dom";
import { countItemsForCollection } from "../../items-helpers";
import config from "../../config";
import TokenService from "../../services/token-service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { fa-folder-plus } from '@fortawesome/free-solid-svg-icons';
import "./CollectionList.css";

export default class CollectionList extends React.Component {
  state = {
    collections: [],
    items: []
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

  onDeleteCollection = collectionId => {
    this.setState({
      collections: this.state.collections.filter(
        collection => collection.id !== collectionId
      )
    });
  };

  render() {
    //console.log(this.state.collections)
    return (
      <div className="CollectionListNav">
        <h2>My Collections</h2>
        <div className="ItemListNavButtonWrapper">
          <Link
            tag={Link}
            to="/add-collection"
            type="button"
            className="itemListNavAddCollectionButton"
          >
            <FontAwesomeIcon icon="fa-folder-plus" />
            Create New Collection
          </Link>
        </div>
        <ul className="CollectionListNavList">
          {this.state.collections.map(collection => (
            <li key={collection.id}>
              <Link
                className="ItemListNavCollectionLink"
                to={`/collection/${collection.id}`}
                collectionid={collection.id}
                title={collection.title}
              >
                {collection.title} Items:   
                <span className="ItemListNavNumItems">
                  {countItemsForCollection(this.state.items, collection.id)}{" "}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
