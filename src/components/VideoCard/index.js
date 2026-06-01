import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import NxtWatchContext from '../../context/NxtWatchContext'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    channel: {name, profileImageUrl},
  } = videoDetails

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const publishedTime = formatDistanceToNow(new Date(publishedAt))

        return (
          <li>
            <Link to={`/videos/${id}`}>
              <img src={thumbnailUrl} alt="video thumbnail" />
              <div>
                <img src={profileImageUrl} alt="channel logo" />
                <div>
                  <h1>{title}</h1>
                  <div>
                    <p>{name}</p>
                    <p>{`${viewCount} views . ${publishedTime} ago`}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default VideoCard
