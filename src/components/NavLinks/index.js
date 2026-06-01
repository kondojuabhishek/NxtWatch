import {NavLink} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import NxtWatchContext from '../../context/NxtWatchContext'

const NavLinks = () => (
  <NxtWatchContext.Consumer>
    {() => (
      <ul className="navlink-container">
        <li>
          <NavLink to="/">
            <AiFillHome />
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/trending">
            <HiFire />
            <p>Trending</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/gaming">
            <SiYoutubegaming />
            <p>Gaming</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/saved-videos">
            <MdPlaylistAdd />
            <p>Saved Videos</p>
          </NavLink>
        </li>
      </ul>
    )}
  </NxtWatchContext.Consumer>
)

export default NavLinks
