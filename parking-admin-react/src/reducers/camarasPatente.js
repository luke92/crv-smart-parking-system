import { handleActions } from 'redux-actions';
import {
    fetchCamarasPatenteStart,
    fetchCamarasPatenteSuccess,
    fetchCamarasPatenteError,
    requestCamarasPatenteStart, 
    requestCamarasPatenteSuccess, 
    requestCamarasPatenteError
} from '../actions/camarasPatente';

const defaultFetchState = {
  data: [],
  isFetching: false,
  hasError: false,
  error: null
}

export const camarasPatente = handleActions(
  {
    [fetchCamarasPatenteStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchCamarasPatenteSuccess]: (state, { payload: { data: { response } } }) => {
      return {
        ...state,
        data: response,
        isFetching: false,
        error: null
      }
    },
    [fetchCamarasPatenteError]: (state, { payload: { error } }) => ({
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

export const camarasPatenteRequest = handleActions(
  {
    [requestCamarasPatenteStart]: state => ({
      ...state,
      isRequesting: true,
      error: null
    }),
    [requestCamarasPatenteSuccess]: (state, { payload: { data: { response } } }) => {
      return {
        ...state,
        data: response,
        isRequesting: false,
        error: null
      }
    },
    [requestCamarasPatenteError]: (state, { payload: { error } }) => ({
      ...state,
      data: null,
      isRequesting: false,
      error
    })
  },
  defaultRequestState
);
