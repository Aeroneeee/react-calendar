import React, { useState } from 'react';
import Calendar from './Calendar';
import './Calendar.css';

const DatePicker: React.FC = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date, show = true) => {
    setSelectedDate(date);
    setShowCalendar(show);
  };

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString()
    : 'Select a date';

  return (
    <div className="date-picker-container">
      <label htmlFor="date-picker">Date Picker</label>
      <div
        className="date-field"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {formattedDate}
      </div>
      {showCalendar && (
        <div className="calendar-popup">
          <Calendar date={selectedDate || new Date()} onSelect={handleDateSelect} />
        </div>
      )}
    </div>
  );
};

export default DatePicker;