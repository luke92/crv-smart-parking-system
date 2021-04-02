import { createActions } from 'redux-actions'
import api from '../services/api'
import apiRoutes from '../constants/apiRoutes'

const { fetchTopParkingsStart, fetchTopParkingsSuccess, fetchTopParkingsError } = createActions({
	FETCH_TOP_PARKINGS_START: () => { },
	FETCH_TOP_PARKINGS_SUCCESS: data => ({ data }),
	FETCH_TOP_PARKINGS_ERROR: error => ({ error })
})

const { fetchParkingsStart, fetchParkingsSuccess, fetchParkingsError } = createActions({
	FETCH_PARKINGS_START: () => { },
	FETCH_PARKINGS_SUCCESS: data => ({ data }),
	FETCH_PARKINGS_ERROR: error => ({ error })
})

const { requestParkingsStart, requestParkingsSuccess, requestParkingsError } = createActions({
	REQUEST_PARKINGS_START: () => { },
	REQUEST_PARKINGS_SUCCESS: data => ({ data }),
	REQUEST_PARKINGS_ERROR: error => ({ error })
})

const fetchTopParkings = cantidad => {
	return async dispatch => {
		dispatch(fetchTopParkingsStart())
		try {
			const response = await api.get(`${apiRoutes.TOPPARKINGS}${cantidad}/`)
			dispatch(fetchTopParkingsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(fetchTopParkingsError({ error }))
		}
	}
}

const fetchParkings = () => {
	return async dispatch => {
		dispatch(fetchParkingsStart())
		try {
			const response = await api.get(`${apiRoutes.PARKINGS}`)
			dispatch(fetchParkingsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(fetchParkingsError({ error }))
		}
	}
}

const editParking = parking => {
	return async dispatch => {
		dispatch(requestParkingsStart())
		try {
			let parkings = [];
			parkings.push(parking);
			const response = await api.put(`${apiRoutes.PARKINGS}`, parkings)
			dispatch(requestParkingsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestParkingsError({ error }))
		}
	}
}

const deleteParking = id => {
	return async dispatch => {
		dispatch(requestParkingsStart())
		try {
			const response = await api.delete(`${apiRoutes.PARKINGS}${id}/`)
			dispatch(requestParkingsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestParkingsError({ error }))
		}
	}
}

const addParking = parking => {
	return async dispatch => {
		dispatch(requestParkingsStart())
		try {
			const response = await api.post(`${apiRoutes.PARKINGS}`, parking)
			dispatch(requestParkingsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestParkingsError({ error }))
		}
	}
}

export {
	fetchParkingsStart,
	fetchParkingsSuccess,
	fetchParkingsError,
	fetchParkings,
	requestParkingsStart,
	requestParkingsSuccess,
	requestParkingsError,
	editParking,
	deleteParking,
	addParking,
	fetchTopParkings,
	fetchTopParkingsStart,
	fetchTopParkingsSuccess,
	fetchTopParkingsError
}