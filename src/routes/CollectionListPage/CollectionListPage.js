import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { countItemsForCollection } from '../../items-helpers'
import config from '../../config'
import './CollectionList.css'

export default class NoteListNav extends React.Component {

  state = {
    collections: [],
    items: [],
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/collections`),
      fetch(`${config.API_ENDPOINT}/items`)
    ])
    .then (([collectionsRes, itemsRes]) => {
      //console.dir(collectionsRes)
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
  render() {
    console.dir(this.state.collections)

    return (
      <div className='ItemListNav'>
        <ul className='ItemListNav__list'>
          {this.state.collections.map(collection =>
            <li key={collection.id}>
              <NavLink
                className='ItemListNav__collection-link'
                to={`/collection/${collection.id}`}
              >
                {collection.title}_ 
                <span className='ItemListNav__num-items'>
                  {countItemsForCollection(this.state.items, collection.id)} Items
                </span>
              </NavLink>
            </li>
          )}
        </ul>
        <div className='ItemListNav__button-wrapper'>
          <button
            tag={Link}
            to='/add-collection'
            type='button'
            className='itemListNav__add-collection-button'
          >
            + Collection
          </button>
        </div>
      </div>
    )
  }
}

