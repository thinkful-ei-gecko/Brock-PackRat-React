
/* export const findCollection = (collections=[], collectionId) =>
collections.find(collection => collection.id === Number(collectionId))

export const findItem = (items=[], itemId) =>
items.find(item => item.id === Number(itemId))

export const getItemsForCollection = (items=[], collectionId) => (
(!collectionId)
  ? items
  : items.filter(item => item.collectionid === Number(collectionId))
) */

export const countItemsForCollection = (items=[], collection_id) =>
items.filter(item => item.collection_id === collection_id).length
