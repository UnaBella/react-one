import request from '../utils/request';
import { getTokenRequest } from '../utils/GlobalContent';

export async function queryCouponDiscount(params) {
  getTokenRequest(params);
  return request('/xmback/coupon/queryCouponDiscount', {
    method: 'POST',
    body: params,
  });
}

export async function addCouponDiscount(params) {
  getTokenRequest(params);
  return request('/xmback/coupon/addCouponDiscount', {
    method: 'POST',
    body: params,
  });
}

export async function publicCouponDiscount(params) {
  getTokenRequest(params);
  return request('/xmback/coupon/publicCouponDiscount', {
    method: 'POST',
    body: params,
  });
}
