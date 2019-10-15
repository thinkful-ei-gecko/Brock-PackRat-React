import TokenService from '../services/token-service'
import config from '../config'

const CollectionApiService = {
  getCollections() {
    return fetch(`${config.API_ENDPOINT}/collections`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getCollection(collectionId) {
    return fetch(`${config.API_ENDPOINT}/collections/${collectionId}`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getCollectionItems(collectionId) {
    return fetch(`${config.API_ENDPOINT}/collections/${collectionId}/items`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  /* postItem(collectionId, text, rating) {
    return fetch(`${config.API_ENDPOINT}/items`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        collection_id: collectionId,
        text,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  } */
}

export default CollectionApiService
