import Swal from 'sweetalert2'

import { types } from "../types/types";

import { fecthWithoutToken, fecthWithToken } from "../helpers/fetch";
import { startClearEvents } from './eventsActions';

export const startLogin = (email, password) => {
    return async (dispatch) => {

        const res = await fecthWithoutToken('auth', { email, password }, 'POST');
        const body = await res.json();

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                id: body.id,
                name: body.name,
            }))

        } else {
            Swal.fire('Error', body.message, 'error');
        }

    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {

        const res = await fecthWithoutToken('auth/new', { name, email, password }, 'POST');
        const body = await res.json();

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                id: body.user._id,
                name: body.user.name,
            }))

        } else {
            Swal.fire('Error', body.message, 'error');
        }

    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user,
});

export const startChecking = () => {
    return async (dispatch) => {

        const res = await fecthWithToken('auth/renew');
        const body = await res.json();

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                id: body.id,
                name: body.name,
            }))

        } else {
            dispatch(checkingFinish());
        }

    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const startLogout = () => {
    return async (dispatch) => {

        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        dispatch(logout());
        dispatch(startClearEvents())

    }
}

const logout = () => ({
    type: types.logout
});