import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import './Calendar.css';
import { CalendarProps, View } from './types';


const Calendar: React.FC<CalendarProps> = ({ date = new Date(), onSelect }) => {
  const [view, setView] = useState<View>('date');
  const [selectedDate, setSelectedDate] = useState<Date>(date);

  const handleDateSelect = (date: Date, newView?: View, showCalendar = true) => {
    setSelectedDate(date);
    if (newView) setView(newView)
    if (onSelect) onSelect(date, showCalendar);
  };

  return (
    <div className="calendar">
      <CalendarHeader
        currentDate={selectedDate}
        setCurrentDate={setSelectedDate}
        view={view}
        setView={setView}
      />
      <CalendarBody
        view={view}
        selectedDate={selectedDate}
        handleDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default Calendar;