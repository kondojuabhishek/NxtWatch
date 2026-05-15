import React from 'react'

const NxtWatchContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedVideosList: [],
  addVideo: () => {},
  removeVideo: () => {},
})

export default NxtWatchContext
