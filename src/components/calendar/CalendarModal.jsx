import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/uiActions';
import { clearEvent, startUpdateEvents, startAddNewEvent } from '../../actions/eventsActions';

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const initDate = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate(),
}

const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [titleIsValid, setTitleIsValid] = useState(true);

    const dispatch = useDispatch();

    const { openModal } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);

    const [formData, setFormData] = useState(initDate);

    const { notes, title, start, end } = formData;

    useEffect(() => {

        if (activeEvent) {
            setFormData(activeEvent);
        } else {
            setFormData(initDate);
        }

    }, [activeEvent, setFormData]);

    const handleInputChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    const handleStartDate = (event) => {
        setDateStart(event);
        setFormData({
            ...formData,
            start: event,
        })
    }

    const handleEndDate = (event) => {
        setDateEnd(event);
        setFormData({
            ...formData,
            end: event,
        })
    }

    const handleSubmitForm = (event) => {

        event.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            Swal.fire('Error', 'La fecha final debe ser mayor a la fecha inicial', 'error');
            return;
        }

        if (title.trim().length < 5) {
            return setTitleIsValid(false);
        }



        if (activeEvent) {
            dispatch(startUpdateEvents(formData));
        } else {
            dispatch(startAddNewEvent(formData))
        }

        setTitleIsValid(true);
        closeModal();

    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        dispatch(clearEvent());
        setFormData(initDate);
    }

    return (
        <Modal
            isOpen={openModal}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            closeTimeoutMS={200}
            overlayClassName="modal-fondo"
        >
            <h1>{activeEvent ? 'Editar evento' : ' Nuevo evento'} </h1>
            <hr />
            <form className="container" onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDate}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDate}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleIsValid && 'is-invalid'} `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

export default CalendarModal