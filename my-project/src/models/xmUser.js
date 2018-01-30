import { queryCurrent } from '../services/xmUser';

export default {
  namespace: 'xmUser',

  state: {
    success: undefined,
    error: undefined,
    results: {
      currentUser: {
        name: undefined,
        avatar: undefined,
      },
    },
  },

  effects: {
    *queryCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, { payload }) {
      // console.log(payload);
      return {
        ...state,
        success: payload.success,
        error: payload.error,
        results: payload.results,
      };
    },
  },
};
