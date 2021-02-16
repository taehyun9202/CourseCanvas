import axios from 'axios'
import * as actions from './types'

export const getUser = () => dispatch => {
    dispatch(setUsersLoading())
    axios.get('http://localhost:8000/api/Users')
        .then(res => dispatch({
            type: actions.GET_UserS,
            payload: res.data
        })
    )
}

export const addUser = User => dispatch => {
    axios.post("http://localhost:8000/api/Users", User)
        .then(res => dispatch({
            type:actions.ADD_UserS,
            payload: User
        })
    )
}

export const deleteUser = id => dispatch => {
    axios.delete(`http://localhost:8000/api/Users/${id}`)
        .then(res =>  dispatch({
            type:actions.DELETE_UserS,
            payload: id
        })
    )
}

export const setUsersLoading = User => {
    return {
        type: actions.UserS_LOADING,
    }
}