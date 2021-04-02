import { createActions } from 'redux-actions'
import api from '../services/api'
import apiRoutes from '../constants/apiRoutes'

const { fetchCamarasPatenteStart, fetchCamarasPatenteSuccess, fetchCamarasPatenteError } = createActions({
	FETCH_CAMARAS_PATENTE_START: () => { },
	FETCH_CAMARAS_PATENTE_SUCCESS: data => ({ data }),
	FETCH_CAMARAS_PATENTE_ERROR: error => ({ error })
})

const { requestCamarasPatenteStart, requestCamarasPatenteSuccess, requestCamarasPatenteError } = createActions({
	REQUEST_CAMARAS_PATENTE_START: () => { },
	REQUEST_CAMARAS_PATENTE_SUCCESS: data => ({ data }),
	REQUEST_CAMARAS_PATENTE_ERROR: error => ({ error })
})

const fetchCamaraPatente = id => {
    return async dispatch => {
		dispatch(fetchCamarasPatenteStart())
		try {
			const response = await api.get(`${apiRoutes.CAMARASPATENTE}/${id}`)
			dispatch(fetchCamarasPatenteSuccess({ response: response.data }))
		} catch (error) {
			dispatch(fetchCamarasPatenteError({ error }))
		}
	}
}

const fetchCamarasPatente = () => {
	return async dispatch => {
		dispatch(fetchCamarasPatenteStart())
		try {
			const response = await api.get(`${apiRoutes.CAMARASPATENTE}`)
			dispatch(fetchCamarasPatenteSuccess({ response: response.data }))
		} catch (error) {
			dispatch(fetchCamarasPatenteError({ error }))
		}
	}
}

const addCamaraPatente = camara => {
	return async dispatch => {
		dispatch(requestCamarasPatenteStart())
		try {
			const response = await api.post(`${apiRoutes.CAMARASPATENTE}`, camara)
			dispatch(requestCamarasPatenteSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestCamarasPatenteError({ error }))
		}
	}
}

const editCamaraPatente = camara => {
	return async dispatch => {
		dispatch(requestCamarasPatenteStart())
		try {
			const response = await api.put(`${apiRoutes.CAMARASPATENTE}${camara.id}/`, camara)
			dispatch(requestCamarasPatenteSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestCamarasPatenteError({ error }))
		}
	}
}

const deleteCamaraPatente = camara => {
	return async dispatch => {
		dispatch(requestCamarasPatenteStart())
		try {
			const response = await api.delete(`${apiRoutes.CAMARASPATENTE}${camara.id}/`, camara)
			dispatch(requestCamarasPatenteSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestCamarasPatenteError({ error }))
		}
	}
}

export {
	fetchCamarasPatenteStart,
	fetchCamarasPatenteSuccess,
	fetchCamarasPatenteError,
	fetchCamarasPatente,
	requestCamarasPatenteStart,
	requestCamarasPatenteSuccess,
	requestCamarasPatenteError,
    editCamaraPatente,
	deleteCamaraPatente,
	fetchCamaraPatente,
	addCamaraPatente
}