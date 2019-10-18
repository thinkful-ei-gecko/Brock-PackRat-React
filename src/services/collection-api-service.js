import TokenService from "../services/token-service";
import config from "../config";

const CollectionApiService = {
  getCollections() {
    return fetch(`${config.API_ENDPOINT}/collections`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getCollection(collection_id) {
    return fetch(`${config.API_ENDPOINT}/collections/${collection_id}`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getCollectionItems(collection_id) {
    return fetch(`${config.API_ENDPOINT}/collections/${collection_id}/items`, {
      headers: {
        Authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default CollectionApiService;
