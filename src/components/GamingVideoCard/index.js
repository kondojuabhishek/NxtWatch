import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

const GamingVideoCard = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails

  return (
    <NxtWatchContext.Consumer>
      {() => (
        <li>
          <Link to={`/videos/${id}`}>
            <img src={thumbnailUrl} alt="video thumbnail" />
            <div>
              <h1>{title}</h1>
              <p>{viewCount} Watching Worldwide</p>
            </div>
          </Link>
        </li>
      )}
    </NxtWatchContext.Consumer>
  )
}

export default GamingVideoCard
