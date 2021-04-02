import { createActions } from 'redux-actions'
import api from 'services/api'
import apiRoutes from '../constants/apiRoutes'

const { fetchPatentsStart, fetchPatentsSuccess, fetchPatentsError } = createActions({
	FETCH_PATENTS_START: () => { },
	FETCH_PATENTS_SUCCESS: data => ({ data }),
	FETCH_PATENTS_ERROR: error => ({ error })
})

const { requestPatentsStart, requestPatentsSuccess, requestPatentsError } = createActions({
	REQUEST_PATENTS_START: () => { },
	REQUEST_PATENTS_SUCCESS: data => ({ data }),
	REQUEST_PATENTS_ERROR: error => ({ error })
})

const fetchTopVehicles = cantidad => {
	return async dispatch => {
		dispatch(fetchPatentsStart())
		try {
			const response = await api.get(`${apiRoutes.TOPVEHICLES}${cantidad}/`)
			dispatch(fetchPatentsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(fetchPatentsError({ error }))
		}
	}
}

const fetchPatents = () => {
	return async dispatch => {
		dispatch(fetchPatentsStart())
		try {
			const response = await api.get(`${apiRoutes.PATENTS}`)
			dispatch(fetchPatentsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(fetchPatentsError({ error }))
		}
	}
}

const editPatent = patent => {
	return async dispatch => {
		dispatch(requestPatentsStart())
		try {
			const response = await api.put(`${apiRoutes.PATENTS}${patent.id}/`, patent)
			dispatch(requestPatentsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestPatentsError({ error }))
		}
	}
}

const deletePatent = id => {
	return async dispatch => {
		dispatch(requestPatentsStart())
		try {
			const response = await api.delete(`${apiRoutes.PATENTS}${id}/`)
			dispatch(requestPatentsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestPatentsError({ error }))
		}
	}
}

const addPatent = patent => {
	return async dispatch => {
		dispatch(requestPatentsStart())
		try {
			const response = await api.post(`${apiRoutes.PATENTS}`, patent)
			dispatch(requestPatentsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestPatentsError({ error }))
		}
	}
}

export {
	fetchPatentsStart,
	fetchPatentsSuccess,
	fetchPatentsError,
	fetchPatents,
	requestPatentsStart,
	requestPatentsSuccess,
	requestPatentsError,
	editPatent,
	deletePatent,
	addPatent,
	fetchTopVehicles
}