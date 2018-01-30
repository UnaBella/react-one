import { realLogin } from '../services/api';
import { setAuthority, setToken } from '../utils/GlobalContent';

export default {
  namespace: 'login',

  state: {
    success: undefined,
    error: undefined,
    results: {
      currentAuthority: undefined,
      userId: undefined,
      token: undefined,
    },
  },

  effects: {
    *login({ payload }, { call, put }) {
      // const response = yield call(fakeAccountLogin, payload);
      const response = yield call(realLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.success === 'ok') {
        // 非常粗暴的跳转,登陆成功之后权限会变成user或admin,会自动重定向到主页
        // Login success after permission changes to admin or user
        // The refresh will automatically redirect to the home page
        // yield put(routerRedux.push('/'));
        window.location.reload();
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        // yield put(routerRedux.push('/user/login'));
        // Login out after permission changes to admin or user
        // The refresh will automatically redirect to the login page
        yield put({
          type: 'changeLoginStatus',
          payload: {
            success: 'no',
            error: undefined,
            results: {
              currentAuthority: 'guest',
              userId: undefined,
              token: undefined,
            },
          },
        });
        window.location.reload();
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.results.currentAuthority);
      setToken(payload.results);
      return {
        ...state,
        success: payload.success,
        error: payload.error,
      };
    },
  },
};
