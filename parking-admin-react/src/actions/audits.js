import { createActions } from 'redux-actions'
import api from '../services/api'
import apiRoutes from '../constants/apiRoutes'

const { fetchAuditsStart, fetchAuditsSuccess, fetchAuditsError } = createActions({
	FETCH_AUDITS_START: () => { },
	FETCH_AUDITS_SUCCESS: data => ({ data }),
	FETCH_AUDITS_ERROR: error => ({ error })
})

const { requestAuditsStart, requestAuditsSuccess, requestAuditsError } = createActions({
	REQUEST_AUDITS_START: () => { },
	REQUEST_AUDITS_SUCCESS: data => ({ data }),
	REQUEST_AUDITS_ERROR: error => ({ error })
})

const fetchAudits = () => {
	return async dispatch => {
		dispatch(fetchAuditsStart())
		try {
			const response = await api.get(`${apiRoutes.AUDITS}`);
			dispatch(fetchAuditsSuccess({ response: response.data }));
		} catch (error) {
			dispatch(fetchAuditsError({ error }));
		}
	}
}

const editAudit = audit => {
	return async dispatch => {
		dispatch(requestAuditsStart())
		try {
			const response = await api.put(`${apiRoutes.AUDITS}${audit.id}/`, audit)
			dispatch(requestAuditsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestAuditsError({ error }))
		}
	}
}

const deleteAudit = id => {
	return async dispatch => {
		dispatch(requestAuditsStart())
		try {
			const response = await api.delete(`${apiRoutes.AUDITS}${id}/`)
			dispatch(requestAuditsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestAuditsError({ error }))
		}
	}
}

const addAudit = audit => {
	return async dispatch => {
		dispatch(requestAuditsStart())
		try {
			const response = await api.post(`${apiRoutes.AUDITS}`, audit)
			dispatch(requestAuditsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestAuditsError({ error }))
		}
	}
}

export {
    fetchAuditsStart,
    fetchAuditsSuccess,
    fetchAuditsError,
	fetchAudits,
	requestAuditsError,
	requestAuditsStart,
	requestAuditsSuccess,
	addAudit,
	editAudit,
	deleteAudit,
}