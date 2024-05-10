import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/dashboard/message/user/list',
    method: 'get'
  })
}

export function getUser(id) {
  return request({
    url: '/dashboard/message/user/' + id,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
