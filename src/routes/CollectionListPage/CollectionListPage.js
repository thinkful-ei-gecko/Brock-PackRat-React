import React from 'react';
import { Link } from 'react-router-dom';
import { countItemsForCollection } from '../../items-helpers';
import config from '../../config';
import TokenService from '../../services/token-service';
import './CollectionList.css';

export default class CollectionList extends React.Component {

  state = {
    collections: [],
    items: [],
  }

  componentDidMount() {

    Promise.all([
      fetch(`${config.API_ENDPOINT}/collections`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${TokenService.getAuthToken()}`
        }
      }),
      fetch(`${config.API_ENDPOINT}/items`)
    ])
    .then (([collectionsRes, itemsRes]) => {
      if (!collectionsRes.ok)
        return collectionsRes.json().then(e => Promise.reject(e));
      if (!itemsRes.ok)
        return itemsRes.json().then(e => Promise.reject(e));
      return Promise.all([collectionsRes.json(), itemsRes.json()]);
    })
    .then(([collections, items]) => {
      this.setState({collections, items})
    })
    .catch(error => {
      console.error({error});
    })
  } 

  onDeleteCollection = collectionId => {
    this.setState({
      collections: this.state.collections.filter(collection => collection.id !== collectionId)
    });
  };

  render() {
    //console.log(this.state.collections)
    return (
      <div className='ItemListNav'>
        <ul className='ItemListNav__list'>
          {this.state.collections.map(collection =>
            <li key={collection.id}>
              <Link
                className='ItemListNav__collection-link'
                to={`/collection/${collection.id}`}
                collectionid={collection.id}
              >
                {collection.title}_ 
                <span className='ItemListNav__num-items'>
                  {countItemsForCollection(this.state.items, collection.id)} Items
                </span>
              </Link>
            </li>
          )}
        </ul>
        <div className='ItemListNav__button-wrapper'>
          <Link
            tag={Link}
            to='/add-collection'
            type='button'
            className='itemListNav__add-collection-button'
          >
            Create New Collection
          </Link>
        </div>
      </div>
    )
  }
}

