import { createActions } from 'redux-actions'
import api from 'services/api'
import apiRoutes from '../constants/apiRoutes'

const { fetchUsersStart, fetchUsersSuccess, fetchUsersError } = createActions({
	FETCH_USERS_START: () => { },
	FETCH_USERS_SUCCESS: data => ({ data }),
	FETCH_USERS_ERROR: error => ({ error })
})

const { fetchGroupsStart, fetchGroupsSuccess, fetchGroupsError } = createActions({
	FETCH_GROUPS_START: () => { },
	FETCH_GROUPS_SUCCESS: data => ({ data }),
	FETCH_GROUPS_ERROR: error => ({ error })
})

const { requestUsersStart, requestUsersSuccess, requestUsersError } = createActions({
	REQUEST_USERS_START: () => { },
	REQUEST_USERS_SUCCESS: data => ({ data }),
	REQUEST_USERS_ERROR: error => ({ error })
})

const fetchGroups = () => {
	return async dispatch => {
		dispatch(fetchGroupsStart())
		try {
			const response = await api.get(`${apiRoutes.GROUPS}`)
			dispatch(fetchGroupsSuccess({ response: response.data }))
		} catch (error) {
			dispatch(fetchGroupsError({ error }))
		}
	}
}

const fetchUsers = () => {
	return async dispatch => {
		dispatch(fetchUsersStart())
		try {
			const response = await api.get(`${apiRoutes.USERSLIST}`)
			dispatch(fetchUsersSuccess({ response: response.data }))
		} catch (error) {
			dispatch(fetchUsersError({ error }))
		}
	}
}

const editUser= user => {
	return async dispatch => {
		dispatch(requestUsersStart())
		try {
			const response = await api.put(`${apiRoutes.USERS}${user.id}/`, user)
			dispatch(requestUsersSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestUsersError({ error }))
		}
	}
}

const deleteUser = id => {
	return async dispatch => {
		dispatch(requestUsersStart())
		try {
			const response = await api.delete(`${apiRoutes.USERS}${id}/`)
			dispatch(requestUsersSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestUsersError({ error }))
		}
	}
}

const addUser = user => {
	return async dispatch => {
		dispatch(requestUsersStart())
		try {
			const response = await api.post(`${apiRoutes.USERS}`, user)
			dispatch(requestUsersSuccess({ response: response.data }))
		} catch (error) {
			dispatch(requestUsersError({ error }))
		}
	}
}

export {
	fetchUsersStart,
	fetchUsersSuccess,
	fetchUsersError,
	fetchGroupsError,
	fetchGroupsStart,
	fetchGroupsSuccess,
	fetchUsers,
	requestUsersStart,
	requestUsersSuccess,
	requestUsersError,
	editUser,
	deleteUser,
	addUser,
	fetchGroups
}