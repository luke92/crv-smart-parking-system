import { handleActions } from 'redux-actions';
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersError,
    fetchGroupsSuccess,
    fetchGroupsStart,
    fetchGroupsError,
  requestUsersStart,
	requestUsersSuccess,
	requestUsersError
} from 'actions/users';

const defaultFetchState = {
  data: [],
  isFetching: false,
  error: null
}

export const users = handleActions(
  {
    [fetchUsersStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchUsersSuccess]: (state, { payload: { data: { response } } }) => {
      return {
        ...state,
        data: response,
        isFetching: false,
        error: null
      }
    },
    [fetchUsersError]: (state, { payload: { error } }) => ({
      ...state,
      data: [],
      isFetching: false,
      error
    })
  },
  defaultFetchState
);

export const groups = handleActions(
  {
    [fetchGroupsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchGroupsSuccess]: (state, { payload: { data: { response } } }) => {
      return {
        ...state,
        data: response,
        isFetching: false,
        error: null
      }
    },
    [fetchGroupsError]: (state, { payload: { error } }) => ({
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

export const usersRequest = handleActions(
  {
    [requestUsersStart]: state => ({
      ...state,
      isRequesting: true,
      error: null
    }),
    [requestUsersSuccess]: (state, { payload: { data: { response } } }) => {
      return {
        ...state,
        data: response,
        isRequesting: false,
        error: null
      }
    },
    [requestUsersError]: (state, { payload: { error } }) => ({
      ...state,
      data: null,
      isRequesting: false,
      error
    })
  },
  defaultRequestState
);