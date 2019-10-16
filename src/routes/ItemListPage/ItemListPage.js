import React from 'react'
import { Link } from 'react-router-dom'
import { getItemsForCollection } from '../../items-helpers'
import config from '../../config'
import Item from '../../components/Item/Item'
import '../ItemListPage/ItemListPage.css'

export default class ItemListPage extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  state = {
    collections: [],
    items: [],
  }

  componentDidMount() {
    //console.log('mount')
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
    const { collection_id } = this.props.match.params
    //console.dir(this.state.collection_id)
    //console.dir(this.state.items)
    //console.dir(collection_id)

    //const { items=[] } = this.context
    const itemsForCollection = getItemsForCollection(this.state.items, collection_id)
    return (
      <section className='ItemListMain'>
        <ul>
          {itemsForCollection.map(item =>
            <li className="ItemInCollection" key={item.id}>
              <Item
                id={item.id}
                name={item.title}
              />
            </li>
          )}
        </ul>
        <div className='ItemListMain__button-container'>
          <button
            tag={Link}
            to='/add-item'
            type='button'
            className='ItemListMain__add-item-button'
          >
            Add Item
          </button>
        </div>
      </section>
    )

    /* function truncate(text) {
        const words = text.split(' ')
      
        if (words.length > 10) {
          return words.slice(0, 10).join(' ') + ' ...'
        }
        return text
    } */
  }
}
