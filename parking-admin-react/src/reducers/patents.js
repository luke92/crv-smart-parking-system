import { handleActions } from 'redux-actions';
import {
  fetchPatentsStart,
  fetchPatentsSuccess,
  fetchPatentsError,
  requestPatentsStart, 
	requestPatentsSuccess, 
	requestPatentsError
} from 'actions/patents';

const defaultFetchState = {
  data: [],
  isFetching: false,
  error: null
}

export const patents = handleActions(
  {
    [fetchPatentsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchPatentsSuccess]: (state, { payload: { data: { response } } }) => {
      return {
        ...state,
        data: response,
        isFetching: false,
        error: null
      }
    },
    [fetchPatentsError]: (state, { payload: { error } }) => ({
      ...state,
      data: [],
      isFetching: false,
      error
    })
  },
  defaultFetchState
);

const defaultRequestState = {
  data: null,
  isRequesting: false,
  error: null
}

export const patentsRequest = handleActions(
  {
    [requestPatentsStart]: state => ({
      ...state,
      isRequesting: true,
      error: null
    }),
    [requestPatentsSuccess]: (state, { payload: { data: { response } } }) => {
      return {
        ...state,
        data: response,
        isRequesting: false,
        error: null
      }
    },
    [requestPatentsError]: (state, { payload: { error } }) => ({
      ...state,
      data: null,
      isRequesting: false,
      error
    })
  },
  defaultRequestState
);