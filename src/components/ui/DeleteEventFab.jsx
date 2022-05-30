import React from 'react'

import { useDispatch } from 'react-redux'

import { startDeleteEvent } from '../../actions/eventsActions';

const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleDeleteEvent = () => {
        dispatch(startDeleteEvent());
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handleDeleteEvent}>
            <i className="fas fa-trash"></i>
            <span> Borrar evento</span>
        </button>
    )
}

export default DeleteEventFab