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