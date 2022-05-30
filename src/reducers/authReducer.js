import { types } from "../types/types";

const initialState = {
    checking: true,
    // id: '',
    // name: '',
}

export const authReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...payload
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false,
            }

        case types.logout:
            return {
                checking: false,
            }

        default:
            return state;
    }


}