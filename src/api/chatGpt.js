
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
    url: '/gpt-init',
    // url: '/gpt-init2',
    method: 'post',
    data: params
  })
}

export function editPrompt(params) {
  return request({
    url: '/prompt/edit',
    method: 'put',
    data: params
  })
}

export function getPrompt() {
  return request({
    url: '/prompt',
    method: 'get'
  })
}
