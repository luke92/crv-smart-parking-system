import { handleActions } from 'redux-actions';
import {
    fetchReportsStart,
    fetchReportsSuccess,
    fetchReportsError,
    requestReportsError,
    requestReportsStart,
    requestReportsSuccess
} from '../actions/reports';

const defaultFetchState = {
    data: [],
    isFetching: false,
    error: null
}

export const reports = handleActions(
    {
        [fetchReportsStart]: state => ({
            ...state,
            isFetching: true,
            error: null
          }),
          [fetchReportsSuccess]: (state, { payload: { data: { response } } }) => {
            return {
              ...state,
              data: response,
              isFetching: false,
              error: null
            }
          },
          [fetchReportsError]: (state, { payload: { error } }) => ({
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

export const reportsRequest = handleActions(
  {
    [requestReportsStart]: state => ({
      ...state,
      isRequesting: true,
      error: null
    }),
    [requestReportsSuccess]: (state, { payload: { data: { response } } }) => {
      return {
        ...state,
        data: response,
        isRequesting: false,
        error: null
      }
    },
    [requestReportsError]: (state, { payload: { error } }) => ({
      ...state,
      data: null,
      isRequesting: false,
      error
    })
  },
  defaultRequestState
);