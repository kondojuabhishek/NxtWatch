import NxtWatchContext from '../../context/NxtWatchContext'

const NotFound = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const notFoundImg = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <div>
          <div>
            <img src={notFoundImg} alt="not found" />
            <h1>Page Not Found</h1>
            <p>We are sorry, the page you requested could not be found.</p>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default NotFound
