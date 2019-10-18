import React from "react";
import { Link } from "react-router-dom";
import { getItemsForCollection } from "../../items-helpers";
import config from "../../config";
import Item from "../../components/Item/Item";
import "../ItemListPage/ItemListPage.css";
import Img from "react-image";

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

  onDeleteItem = itemId => {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId)
    });
  };

  componentDidMount() {
    //console.log('mount')
    Promise.all([
      fetch(`${config.API_ENDPOINT}/collections`),
      fetch(`${config.API_ENDPOINT}/items`)
    ])
      .then(([collectionsRes, itemsRes]) => {
        //console.dir(collectionsRes)
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

  render() {
    const { collection_id } = this.props.match.params;
    //console.log( collection_id )
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

        <ul>
          {itemsForCollection.map(item => (
            <li className="ItemInCollection" key={item.id}>
              <Img src={item.image_url} height="50px" width="50px" />
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
