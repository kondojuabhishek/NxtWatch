import styled from 'styled-components'

export const LoginPageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isDark ? '#231f20' : '#f9f9f9')};
`
export const LoginFormContainer = styled.form`
  padding: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 60%;
  background-color: ${props => (props.isDark ? '#0f0f0f' : '#ffffff')};
  box-shadow: ${props => (props.isDark ? 'none' : '0 4px 16px 0 #bfbfbf')};
  @media screen and (min-width: 768px) {
    padding: 50px;
    max-width: 500px;
  }
`
export const LoginLogo = styled.img`
  width: 150px;
  align-self: center;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    width: 200px;
  }
`
export const LoginButton = styled.button`
  color: #ffffff;
  background-color: #3b82f6;
  padding: 8px 16px;
  margin-top: 20px;
  font-weight: bold;
  border: 0px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    padding: 12px 16px;
  }
`
export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  @media screen and (min-width: 768px) {
    margin-bottom: 30px;
  }
`
export const InputLabel = styled.label`
  font-size: 12px;
  margin-bottom: 8px;
  font-weight: bold;
  color: ${props => (props.isDark ? '#ffffff' : '#616e7c')};
  @media screen and (min-width: 768px) {
    font-size: 15px;
  }
`
export const UserInput = styled.input`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  border: ${props =>
    props.isDark ? '1px solid #475569' : '1px solid #cccccc'};
  color: ${props => (props.isDark ? '#ffffff' : '#1e293b')};
  background-color: transparent;
  @media screen and (min-width: 768px) {
    padding: 12px 16px;
  }
`
export const ShowPasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const ShowPasswordLabel = styled.label`
  font-size: 12px;
  font-weight: bold;
  margin-left: 6px;
  color: ${props => (props.isDark ? '#ffffff' : '#212121')};
`
export const ErrorMsg = styled.p`
  color: #ff0b37;
  font-size: 12px;
  font-weight: bold;
  margin-top: 12px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`
