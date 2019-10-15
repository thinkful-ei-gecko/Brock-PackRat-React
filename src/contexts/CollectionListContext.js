import React from 'react'

const CollectionListContext = React.createContext({
  collections: [],
  items: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setCollectionList: () => {},
})
export default CollectionListContext
