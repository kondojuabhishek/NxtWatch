import {MdPlaylistAdd} from 'react-icons/md'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import VideoCard from '../VideoCard'

const SavedVideos = () => {
  const renderEmptyView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h1>No Saved Videos Found</h1>
      <p>You can save your videos while watching them.</p>
    </div>
  )

  const renderVideoList = savedVideosList => (
    <>
      <div data-testid="banner">
        <div>
          <MdPlaylistAdd />
        </div>
        <h1>Saved Videos</h1>
      </div>
      <ul>
        {savedVideosList.map(video => (
          <VideoCard key={video.id} videoDetails={video} />
        ))}
      </ul>
    </>
  )

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {savedVideosList} = value

        return (
          <>
            <Header />
            <div data-testid="savedVideos">
              <Sidebar />
              <div className="saved-videos-content">
                {savedVideosList.length === 0
                  ? renderEmptyView()
                  : renderVideoList(savedVideosList)}
              </div>
            </div>
          </>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default SavedVideos
