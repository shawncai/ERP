import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const useCountry = 'useCountry'

export function getToken2() {
  return Cookies.get(useCountry)
}

export function setToken2(token) {
  return Cookies.set(useCountry, token)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
