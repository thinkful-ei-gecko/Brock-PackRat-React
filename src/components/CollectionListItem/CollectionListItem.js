import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class CollectionListItem extends Component {
  render() {
    const { collection } = this.props
    console.log(this.props)

    return (
      <Link to={`/collections/${collection.id}`} className='CollectionListItem'>
        <div className='CollectionListItem__details'>
          <div className='CollectionListItem__text'>
            <h2 className='CollectionListItem__heading'>{collection.title}</h2>
            <p className='CollectionListItem__description'>{truncate(collection.content)}</p>
          </div>
        </div>
      </Link>
    )
  }
}

function truncate(text) {
  const words = text.split(' ')

  if (words.length > 10) {
    return words.slice(0, 10).join(' ') + ' ...'
  }

  return text
}
