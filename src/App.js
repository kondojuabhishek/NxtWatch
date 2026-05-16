import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import NxtWatchContext from './context/NxtWatchContext'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './components/Home'
import Login from './components/Login'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

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
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
