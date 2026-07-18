import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {
  LoginPageContainer,
  LoginFormContainer,
  LoginLogo,
  LoginButton,
  InputContainer,
  InputLabel,
  UserInput,
  ShowPasswordContainer,
  ShowPasswordLabel,
  ErrorMsg,
} from './styledComponents'
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
            <LoginPageContainer isDark={isDarkTheme}>
              <LoginFormContainer
                onSubmit={this.submitForm}
                isDark={isDarkTheme}
              >
                {isDarkTheme ? (
                  <LoginLogo
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                  />
                ) : (
                  <LoginLogo
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                )}
                <InputContainer>
                  <InputLabel htmlFor="username" isDark={isDarkTheme}>
                    USERNAME
                  </InputLabel>
                  <UserInput
                    type="text"
                    id="username"
                    value={username}
                    placeholder="Username"
                    onChange={this.onChangeUsername}
                    isDark={isDarkTheme}
                  />
                </InputContainer>
                <InputContainer>
                  <InputLabel htmlFor="password" isDark={isDarkTheme}>
                    PASSWORD
                  </InputLabel>
                  <UserInput
                    type={inputType}
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={this.onChangePassword}
                    isDark={isDarkTheme}
                  />
                </InputContainer>
                <ShowPasswordContainer>
                  <input
                    type="checkbox"
                    id="showPassword"
                    onChange={this.onChangeShowPassword}
                  />
                  <ShowPasswordLabel
                    htmlFor="showPassword"
                    isDark={isDarkTheme}
                  >
                    Show Password
                  </ShowPasswordLabel>
                </ShowPasswordContainer>
                <LoginButton type="submit">Login</LoginButton>
                {showErrorMsg && <ErrorMsg>*{errorMsg}</ErrorMsg>}
              </LoginFormContainer>
            </LoginPageContainer>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login
