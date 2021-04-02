import { createActions } from 'redux-actions'
import api from '../services/api'
import apiRoutes from '../constants/apiRoutes'

const { fetchReportsStart, fetchReportsSuccess, fetchReportsError } = createActions({
	FETCH_REPORTS_START: () => { },
	FETCH_REPORTS_SUCCESS: data => ({ data }),
	FETCH_REPORTS_ERROR: error => ({ error })
})

const { requestReportsStart, requestReportsSuccess, requestReportsError } = createActions({
	REQUEST_REPORTS_START: () => { },
	REQUEST_REPORTS_SUCCESS: data => ({ data }),
	REQUEST_REPORTS_ERROR: error => ({ error })
})

const fetchReports = () => {
	return async dispatch => {
		dispatch(fetchReportsStart())
		try {
			const response = await api.get(`${apiRoutes.REPORTS}`);
			dispatch(fetchReportsSuccess({ response: response.data }));
		} catch (error) {
			dispatch(fetchReportsError({ error }));
		}
	}
}

const editReport = report => {
	return async dispatch => {
		dispatch(requestReportsStart())
		try {
			const response = await api.put(`${apiRoutes.REPORTS}${report.id}/`, report)
			dispatch(requestReportsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestReportsError({ error }))
		}
	}
}

const deleteReport = id => {
	return async dispatch => {
		dispatch(requestReportsStart())
		try {
			const response = await api.delete(`${apiRoutes.REPORTS}${id}/`)
			dispatch(requestReportsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestReportsError({ error }))
		}
	}
}

const addReport = report => {
	return async dispatch => {
		dispatch(requestReportsStart())
		try {
			const response = await api.post(`${apiRoutes.REPORTS}`, report)
			dispatch(requestReportsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestReportsError({ error }))
		}
	}
}

export {
    fetchReportsStart,
    fetchReportsSuccess,
    fetchReportsError,
	fetchReports,
	requestReportsError,
	requestReportsStart,
	requestReportsSuccess,
	addReport,
	editReport,
	deleteReport,
}