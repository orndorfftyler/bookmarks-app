import React from 'react'

const BookmarksContext = React.createContext({
  bookmarks: [],
  addBookmark: () => {},
  deleteBookmark: () => {},
  updateArticle: () => {},
})

export default BookmarksContext