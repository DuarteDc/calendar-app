import { types } from "../types/types";

const initialState = {
    openModal: false,
}

export const uiReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case types.uiOpenModal:
            return {
                ...state,
                openModal: true
            };

        case types.uiCloseModal:
            return {
                ...state,
                openModal: false,
            };


        default:
            return state;

    }

}