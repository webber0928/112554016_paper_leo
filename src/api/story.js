import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/story/list',
    method: 'get',
    params: params
  })
}

export function getOne(id) {
  return request({
    url: `/story/${id}`,
    method: 'get'
  })
}

export function updateOne(id, params) {
  return request({
    url: `/story/${id}`,
    method: 'put',
    data: params
  })
}

export function create(params) {
  return request({
    url: `/story/`,
    method: 'post',
    data: params
  })
}

export function triggerPlay(params) {
  return request({
    url: `/trigger/play/${params.word}`,
    method: 'put',
    data: params
  })
}

export function triggerOpen(params) {
  return request({
    url: `/trigger/open/${params.word}`,
    method: 'put',
    data: params
  })
}
