export const findCollection = (collections = [], collection_id) =>
  collections.find(collection => collection.id === Number(collection_id));

export const findItem = (items = [], itemId) =>
  items.find(item => item.id === Number(itemId));

export const getItemsForCollection = (items = [], collection_id) =>
  !collection_id
    ? items
    : items.filter(item => item.collection_id === Number(collection_id));

export const countItemsForCollection = (items = [], collection_id) =>
  items.filter(item => item.collection_id === collection_id).length;