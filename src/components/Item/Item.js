import React from 'react'
import { Link } from 'react-router-dom'
import config from '../../config'

export default class Item extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }

  handleClickDelete = e => {
    e.preventDefault()
    const itemId = this.props.id

    fetch(`${config.API_ENDPOINT}/items/${itemId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return;
      })
      .then(() => {
        this.context.deleteItem(itemId)
        // allow parent to perform extra behaviour
        this.props.onDeleteItem(itemId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id } = this.props
    return (
      <div className='Item'>
        <h2 className='Item__title'>
          <Link to={`/item/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Item__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          remove
        </button>
      </div>
    )
  }
}
