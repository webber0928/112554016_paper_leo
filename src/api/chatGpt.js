
import request from '@/utils/request'

export function sendMessage(params) {
  return request({
    url: `/gpt-message`,
    method: 'post',
    data: params
  })
}

export function initGpt() {
  return request({
    url: '/gpt-init',
    method: 'post'
  })
}
export function initGpt2(params) {
  return request({
    url: '/gpt-init2',
    method: 'post',
    data: params
  })
}
