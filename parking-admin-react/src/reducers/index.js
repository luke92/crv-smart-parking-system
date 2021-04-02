import { combineReducers } from 'redux'
import { parkings, parkingsRequest, topParkings } from './parkings'
import { reports, reportsRequest } from './reports'
import { configurations } from './configuration'
import { authentication } from './authentication'
import { handleActions } from "redux-actions";
import { fetchParkingsError, fetchParkingsStart, fetchParkingsSuccess } from "../actions/parkings";
import { camaras, camarasRequest } from './camaras'
import { patents, patentsRequest } from './patents'
import { audits, auditsRequest } from './audits'
import { camarasPatente, camarasPatenteRequest } from './camarasPatente'
import {groups, users, usersRequest} from "./users";

const defaultFetchState = {
  data: [],
  isFetching: false,
  error: null
}

export const parkingsResume = handleActions(
  {
    [fetchParkingsStart]: state => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [fetchParkingsSuccess]: (state, { payload: { data: { response } } }) => {
      let resume = {'total': 0, 'free': 0, 'occupated': 0};
      for (let i = 0; i < response.length; i++) {
          resume.total++;
          if (response[i].isOccupied) {
              resume.occupated++;
          } else {
              resume.free++;
          }
        }
        return {
        ...state,
        data: resume,
        isFetching: false,
        error: null
      }
    },
    [fetchParkingsError]: (state, { payload: { error } }) => ({
      ...state,
      data: [],
      isFetching: false,
      error
    })
  },
  defaultFetchState
);

const reducers = combineReducers({
	parkings,
	parkingsRequest,
	parkingsResume,
  configurations,
  audits,
  auditsRequest,
  reports,
  reportsRequest,
  camaras,
	camarasRequest,
  authentication,
	patents,
  patentsRequest,
    users,
    usersRequest,
    groups,
  camarasPatente,
  camarasPatenteRequest,
  topParkings
})

export default reducers