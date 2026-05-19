import Popup from 'reactjs-popup'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsBrightnessHigh} from 'react-icons/bs'
import {FaMoon} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import NxtWatchContext from '../../context/NxtWatchContext'
import NavLinks from '../NavLinks'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <NxtWatchContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value

        return (
          <nav className="nav-header">
            <div className="nav-content">
              <Link to="/">
                <img
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
              </Link>
              {/* Displayed in the website version */}
              <div className="nav-menu">
                <button type="button" data-testid="theme" onClick={toggleTheme}>
                  {isDarkTheme ? <BsBrightnessHigh /> : <FaMoon />}
                </button>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
                <Popup modal trigger={<button>Logout</button>}>
                  {close => (
                    <div>
                      <p>Are you sure you want to logout?</p>
                      <div>
                        <button type="button" onClick={() => close()}>
                          Close
                        </button>
                        <button type="button" onClick={onClickLogout}>
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
              {/* Displayed only in tht mobile version */}
              <div className="nav-mobile-memu">
                <button type="button" onClick={toggleTheme}>
                  {isDarkTheme ? <BsBrightnessHigh /> : <FaMoon />}
                </button>
                <Popup
                  modal
                  trigger={
                    <button type="button">
                      <GiHamburgerMenu />
                    </button>
                  }
                >
                  <NavLinks />
                </Popup>
                <Popup
                  modal
                  trigger={
                    <button type="button">
                      <FiLogOut />
                    </button>
                  }
                >
                  {close => (
                    <div>
                      <p>Are you sure you want to logout?</p>
                      <div>
                        <button type="button" onClick={() => close()}>
                          Close
                        </button>
                        <button type="button" onClick={onClickLogout}>
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </nav>
        )
      }}
    </NxtWatchContext.Consumer>
  )
}

export default withRouter(Header)
