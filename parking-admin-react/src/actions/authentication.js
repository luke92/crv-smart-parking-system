import api from '../services/api';
import apiRoutes from '../constants/apiRoutes';
import {createActions} from 'redux-actions';

const { loginStart, loginSuccess, loginError } = createActions({
	LOGIN_START: () => { },
	LOGIN_SUCCESS: data => ({ data }),
	LOGIN_ERROR: error => ({ error })
})

const handleLogin = data => {
	return async dispatch => {
		dispatch(loginStart())
		try {
			const response = await api.post(`${apiRoutes.LOGIN}`, data)
			dispatch(loginSuccess({ response: response.data }))
		} catch (error) {
			dispatch(loginError({ error }))
		}
	}
}

export {
    handleLogin,
	loginStart,
	loginSuccess,
	loginError
}