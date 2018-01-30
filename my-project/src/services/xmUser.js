import request from '../utils/request';

// 登陆接口
export async function validate(params) {
  return request('/xmback/user/validate', {
    method: 'POST',
    body: params,
  });
}

export async function queryCurrent(params) {
  return request('/xmback/user/currentUser', {
    method: 'POST',
    body: params,
  });
}
