import moment from 'moment';

import { types } from "../types/types";

const initialState = {

    events: [],
    activeEvent: null

};

export const calendarReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case types.eventsLoaded:
            return {
                ...state,
                events: payload,
            }

        case types.addNewEvent:
            return {
                ...state,
                events: [...state.events, payload],
            }

        case types.setActiveEvent:
            return {
                ...state,
                activeEvent: payload,
            }

        case types.clearEvent:
            return {
                ...state,
                activeEvent: null
            }


        case types.updateEvent:
            return {
                ...state,
                events: state.events.map(e => e.id === payload.id ? payload : e)
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(e => e.id !== payload),
                activeEvent: null,
            }

        case types.clearEvents:
            return {
                ...initialState,
            }

        default:
            return state;

    }

}