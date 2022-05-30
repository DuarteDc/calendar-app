import Swal from 'sweetalert2'

import { types } from "../types/types";

import { fecthWithToken } from "../helpers/fetch";
import { prepareEvents } from '../helpers/prepareEvents';


export const startLoadEvents = () => {
    return async (dispatch) => {

        try {
            const res = await fecthWithToken('events');
            const body = await res.json();

            const events = prepareEvents(body.events);

            dispatch(eventsLoaded(events));
        } catch (error) {
            Swal.fire('Error', 'Hubo un error al cargar los eventos', 'error');
        }

    }
}

const eventsLoaded = (events) => ({
    type: types.eventsLoaded,
    payload: events
})

export const startAddNewEvent = (event) => {
    return async (dispatch, getState) => {

        const { id, name } = getState().auth;

        try {
            const res = await fecthWithToken('events', event, 'POST');
            const body = await res.json();

            event.id = body.event._id;
            event.user = {
                _id: id,
                name
            }

            dispatch(addNewEvet(event));
        } catch (error) {
            Swal.fire('Error', 'Hubo un error al crear el evento', 'error');
        }
    }
}

const addNewEvet = (event) => ({
    type: types.addNewEvent,
    payload: event,
});


export const startUpdateEvents = (event) => {
    return async (dispatch) => {

        try {
            const id = event._id;
            const res = await fecthWithToken(`events/${id}`, event, 'PUT');
            const body = await res.json();

            dispatch(eventUpdeted(event));
            if (!body.ok) {
                Swal.fire('Error', body.message, 'error');
                return;
            }
            Swal.fire('Success', 'El evento se actualizo con exito', 'success')
        } catch (error) {

            Swal.fire('Error', 'Hubo un error al actualizar el evento', 'error')
        }

    }
}
export const setActiveEvent = (event) => ({
    type: types.setActiveEvent,
    payload: event,
});

export const clearEvent = () => ({
    type: types.clearEvent,
})

export const eventUpdeted = (event) => ({
    type: types.updateEvent,
    payload: event
})


export const startDeleteEvent = () => {
    return async (dispatch, getState) => {

        const { _id } = getState().calendar.activeEvent;

        try {

            const res = await fecthWithToken(`events/${_id}`, {}, 'DELETE');
            const body = await res.json();

            if (!body.ok) {
                Swal.fire('Error', body.message, 'error');
                return;
            }
            dispatch(eventDeleted(_id));
            Swal.fire('Success', body.message, 'success')
        } catch (error) {

            Swal.fire('Error', 'Hubo un error al actualizar el evento', 'error')
        }


    }
}

const eventDeleted = (id) => ({
    type: types.eventDeleted,
    payload: id
})

export const startClearEvents = () => ({
    type: types.clearEvents,
})