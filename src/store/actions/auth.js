import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
       dispatch(authStart())
       const authData = {
           email: email,
           password: password,
           returnSecureToken: true
       }
       let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-Ltyf6jiGmmnGRWhUPkeF3CYIkDkQVOQ'
       if (!isSignup){
           url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-Ltyf6jiGmmnGRWhUPkeF3CYIkDkQVOQ'
       }
       axios.post(url, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('userId', response.data.localId)
            localStorage.setItem('expirationDate', expirationDate)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error))
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        }
        else {
            // converts a string into a Date object
            const expirationDate = new Date (localStorage.getItem('expirationDate'))
            const userId = localStorage.getItem('userId')
            if (expirationDate > new Date()) {
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            } else {
                dispatch(logout())
            }
            
        }
    }
}