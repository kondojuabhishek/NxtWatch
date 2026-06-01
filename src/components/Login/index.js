import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMsg: '',
    showErrorMsg: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token) {
      return <Redirect to="/" />
    }
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const {
            showPassword,
            showErrorMsg,
            errorMsg,
            password,
            username,
          } = this.state
          const inputType = showPassword ? 'text' : 'password'

          return (
            <div className="login-page-container">
              <form className="login-form-container" onSubmit={this.submitForm}>
                {isDarkTheme ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                    className="login-app-logo"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                )}
                <div className="input-container">
                  <label className="input-label" htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    className="username-input-filed"
                    onChange={this.onChangeUsername}
                  />
                </div>
                <div className="input-container">
                  <label className="input-label" htmlFor="password">
                    PASSWORD
                  </label>
                  <input
                    type={inputType}
                    id="password"
                    value={password}
                    className="password-input-filed"
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="show-password-container">
                  <input
                    type="checkbox"
                    id="showPassword"
                    onChange={this.onChangeShowPassword}
                  />
                  <label htmlFor="showPassword">Show Password</label>
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {showErrorMsg && <p>*{errorMsg}</p>}
              </form>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login
