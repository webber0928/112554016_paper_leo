import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const UsernameKey = 'username'
const UserIdKey = 'userId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(token) {
  return Cookies.set(UserIdKey, token)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}

export function getUsername() {
  return Cookies.get(UsernameKey)
}

export function setUsername(username) {
  return Cookies.set(UsernameKey, username)
}

export function removeUsername() {
  return Cookies.remove(UsernameKey)
}
