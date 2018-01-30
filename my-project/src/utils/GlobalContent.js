const AuthorityKey = 'xm-back-authority';
const AuthorityDefault = 'guest';
const TokenKey = 'xm-back-token';


export function getAuthority() {
  return localStorage.getItem(AuthorityKey) || AuthorityDefault;
}

export function setAuthority(authority) {
  return localStorage.setItem(AuthorityKey, authority);
}

export function getToken() {
  return JSON.parse(localStorage.getItem(TokenKey)) || '';
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, JSON.stringify(token));
}

export function getTokenRequest(params) {
  const result = {
    token: getToken().token,
    userid: getToken().userId,
    params,
  };
  return result;
}
