import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'
import Sidebar from '../Sidebar'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const videoDetails = data.video_details
      const formattedData = {
        id: videoDetails.id,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        thumbnailUrl: videoDetails.thumbnail_url,
        viewCount: videoDetails.view_count,
        publishedAt: videoDetails.published_at,
        description: videoDetails.description,
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
      }

      this.setState({
        videoDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onClickDislike = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  onClickRetry = () => {
    this.getVideoDetails()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const failureImg = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <div>
            <img src={failureImg} alt="failure view" />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <button type="button" onClick={this.onClickRetry}>
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderSuccessView = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {savedVideosList, addVideo, removeVideo, isDarkTheme} = value
        const {videoDetails, isLiked, isDisliked} = this.state
        const {
          title,
          videoUrl,
          viewCount,
          publishedAt,
          description,
          channel: {name, profileImageUrl, subscriberCount},
        } = videoDetails

        const isSaved = savedVideosList.some(
          video => video.id === videoDetails.id,
        )

        const onClickSave = () => {
          if (isSaved) {
            removeVideo(videoDetails.id)
          } else {
            addVideo(videoDetails)
          }
        }

        const saveButtonText = isSaved ? 'Saved' : 'Save'

        return (
          <div>
            <ReactPlayer url={videoUrl} controls width="100%" />
            <h1>{title}</h1>
            <div>
              <p>
                {viewCount} views . {formatDistanceToNow(new Date(publishedAt))}{' '}
                ago
              </p>
              <div>
                <button type="button" onClick={this.onClickLike}>
                  <AiOutlineLike /> Like
                </button>
                <button type="button" onClick={this.onClickDislike}>
                  <AiOutlineDislike /> Dislike
                </button>
                <button type="button" onClick={onClickSave}>
                  <MdPlaylistAdd /> {saveButtonText}
                </button>
              </div>
            </div>
            <hr />
            <div>
              <img src={profileImageUrl} alt="channel logo" />
              <div>
                <p>{name}</p>
                <p>{subscriberCount} subscribers</p>
                <p>{description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderVideoDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div data-testid="videoItemDetails">
          <Sidebar />
          <div className="video-content">{this.renderVideoDetails()}</div>
        </div>
      </>
    )
  }
}

export default VideoItemDetails
