import {combineReducers} from "redux";
import {parkings, parkingsRequest} from "./parkings";
import {configurations} from "./configuration";
import {camaras, camarasRequest} from "./camaras";
import {parkingsResume} from "./index";
import {handleActions} from "redux-actions";
import {loginStart, loginSuccess, loginError} from "../actions/authentication";

const defaultFetchState = {
  data: [],
  isFetching: false,
  error: null,
  success: false
}

export const authentication = handleActions(
  {
    [loginStart]: state => ({
      ...state,
      isFetching: true,
      error: null,
      success: false
    }),
    [loginSuccess]: (state, { payload: { data: { response } } }) => {
        return {
        ...state,
        data: response,
        isFetching: false,
        error: null,
        success: true
      }
    },
    [loginError]: (state, { payload: { error } }) => ({
      ...state,
      data: [],
      isFetching: false,
      error,
      success : false
    })
  },
  defaultFetchState
);

const reducers = combineReducers({
	login: authentication

})