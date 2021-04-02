import { handleActions } from 'redux-actions';
import {
    fetchAuditsStart,
    fetchAuditsSuccess,
    fetchAuditsError,
    requestAuditsError,
    requestAuditsStart,
    requestAuditsSuccess
} from '../actions/audits';

const defaultFetchState = {
    data: [],
    isFetching: false,
    error: null
}

export const audits = handleActions(
    {
        [fetchAuditsStart]: state => ({
            ...state,
            isFetching: true,
            error: null
          }),
          [fetchAuditsSuccess]: (state, { payload: { data: { response } } }) => {
            return {
              ...state,
              data: response,
              isFetching: false,
              error: null
            }
          },
          [fetchAuditsError]: (state, { payload: { error } }) => ({
            ...state,
            data: [],
            isFetching: false,
            error
          })
    },
    defaultFetchState
)

const defaultRequestState = {
  data: null,
  isRequesting: false,
  error: null
}

export const auditsRequest = handleActions(
  {
    [requestAuditsStart]: state => ({
      ...state,
      isRequesting: true,
      error: null
    }),
    [requestAuditsSuccess]: (state, { payload: { data: { response } } }) => {
      return {
        ...state,
        data: response,
        isRequesting: false,
        error: null
      }
    },
    [requestAuditsError]: (state, { payload: { error } }) => ({
      ...state,
      data: null,
      isRequesting: false,
      error
    })
  },
  defaultRequestState
);