import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-es';

import moment from 'moment';
import 'moment/locale/es';

import Navbar from '../ui/Navbar'
import CalendarEvent from './CalendarEvent';
import CalendarModal from './CalendarModal';

import { uiOpenModal } from '../../actions/uiActions';
import { clearEvent, setActiveEvent, startLoadEvents } from '../../actions/eventsActions';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {

  const { events, activeEvent } = useSelector(state => state.calendar);
  const { id } = useSelector(state => state.auth);

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const dispatch = useDispatch();

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: (id === event.user._id) ? '#367CF7' : '#FE0C89',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }

  }

  const onDoubleClick = (event) => {
    dispatch(uiOpenModal());
  }

  const onSelectEvent = (event) => {
    dispatch(setActiveEvent(event));
  }

  const onViewChange = (event) => {
    setLastView(event);
    localStorage.setItem('lastView', event)
  }

  const onSelectSlot = (event) => {
    dispatch(clearEvent())
  }
  useEffect(() => {
    dispatch(startLoadEvents())
  }, [dispatch])


  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        eventPropGetter={eventStyleGetter}
        onView={onViewChange}
        view={lastView}
        onSelectSlot={onSelectSlot}
        selectable={true}
        components={{
          event: CalendarEvent
        }}
      />

      <AddNewFab />
      {
        activeEvent && (
          <DeleteEventFab />
        )
      }
      <CalendarModal />


    </div>
  )
}

export default CalendarScreen