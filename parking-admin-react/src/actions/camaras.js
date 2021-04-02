import { createActions } from 'redux-actions'
import api from '../services/api'
import apiRoutes from '../constants/apiRoutes'

const { fetchCamarasStart, fetchCamarasSuccess, fetchCamarasError } = createActions({
	FETCH_CAMARAS_START: () => { },
	FETCH_CAMARAS_SUCCESS: data => ({ data }),
	FETCH_CAMARAS_ERROR: error => ({ error })
})

const { requestCamarasStart, requestCamarasSuccess, requestCamarasError } = createActions({
	REQUEST_CAMARAS_START: () => { },
	REQUEST_CAMARAS_SUCCESS: data => ({ data }),
	REQUEST_CAMARAS_ERROR: error => ({ error })
})

const fetchCamara = id => {
    return async dispatch => {
		dispatch(fetchCamarasStart())
		try {
			const response = await api.get(`${apiRoutes.CAMARAS}/${id}`)
			dispatch(fetchCamarasSuccess({ response: response.data }))
		} catch (error) {
			dispatch(fetchCamarasError({ error }))
		}
	}
}

const fetchCamaras = () => {
	return async dispatch => {
		dispatch(fetchCamarasStart())
		try {
			const response = await api.get(`${apiRoutes.CAMARAS}`)
			dispatch(fetchCamarasSuccess({ response: response.data }))
		} catch (error) {
			dispatch(fetchCamarasError({ error }))
		}
	}
}

const addCamara = camara => {
	return async dispatch => {
		dispatch(requestCamarasStart())
		try {
			const response = await api.post(`${apiRoutes.CAMARAS}`, camara)
			dispatch(requestCamarasSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestCamarasError({ error }))
		}
	}
}

const editCamara = camara => {
	return async dispatch => {
		dispatch(requestCamarasStart())
		try {
			const response = await api.put(`${apiRoutes.CAMARAS}${camara.id}/`, camara)
			dispatch(requestCamarasSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestCamarasError({ error }))
		}
	}
}

const deleteCamara = camara => {
	return async dispatch => {
		dispatch(requestCamarasStart())
		try {
			const response = await api.delete(`${apiRoutes.CAMARAS}${camara.id}/`, camara)
			dispatch(requestCamarasSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestCamarasError({ error }))
		}
	}
}

export {
	fetchCamarasStart,
	fetchCamarasSuccess,
	fetchCamarasError,
	fetchCamaras,
	requestCamarasStart,
	requestCamarasSuccess,
	requestCamarasError,
    editCamara,
	deleteCamara,
	fetchCamara,
	addCamara
}