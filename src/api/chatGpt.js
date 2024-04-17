
import request from '@/utils/request'

export function sendMessage(historyItems) {
  return request({
    url: `/gpt-message`,
    method: 'post',
    data: { historyItems }
  })
}

export function initGpt() {
  return request({
    url: '/gpt-init',
    method: 'post'
  })
}
export function initGpt2(story) {
  return request({
    url: '/gpt-init2',
    method: 'post',
    data: { story }
  })
}
