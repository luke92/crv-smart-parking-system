import { handleActions } from 'redux-actions';
import {
    fetchCamarasStart,
    fetchCamarasSuccess,
    fetchCamarasError,
    requestCamarasStart, 
    requestCamarasSuccess, 
    requestCamarasError
} from '../actions/camaras';

const defaultFetchState = {
  data: [],
  isFetching: false,
  hasError: false,
  error: null
}

export const camaras = handleActions(
  {
    [fetchCamarasStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchCamarasSuccess]: (state, { payload: { data: { response } } }) => {
      return {
        ...state,
        data: response,
        isFetching: false,
        error: null
      }
    },
    [fetchCamarasError]: (state, { payload: { error } }) => ({
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

export const camarasRequest = handleActions(
  {
    [requestCamarasStart]: state => ({
      ...state,
      isRequesting: true,
      error: null
    }),
    [requestCamarasSuccess]: (state, { payload: { data: { response } } }) => {
      return {
        ...state,
        data: response,
        isRequesting: false,
        error: null
      }
    },
    [requestCamarasError]: (state, { payload: { error } }) => ({
      ...state,
      data: null,
      isRequesting: false,
      error
    })
  },
  defaultRequestState
);
