
import {Component} from 'react'
import NxtWatchContext from './context/NxtWatchContext'

import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideosList: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  addVideo = video => {
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, video],
    }))
  }

  removeVideo = id => {
    this.setState(prevState => ({
      savedVideosList: prevState.savedVideosList.filter(each => each.id !== id),
    }))
  }

  render() {
    const {isDarkTheme, savedVideosList} = this.state

    return (
      <NxtWatchContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          savedVideosList,
          addVideo: this.addVideo,
          removeVideo: this.removeVideo,
        }}
      >
        {/* Routes will go here */}
      </NxtWatchContext.Provider>
    )
  }
}

export default App
