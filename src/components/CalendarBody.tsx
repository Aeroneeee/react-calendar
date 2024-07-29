import React from 'react';
import { getDaysInMonth } from './utils';
import { CalendarBodyProps } from './types';
import { JSX } from 'react/jsx-runtime';


const CalendarBody: React.FC<CalendarBodyProps> = ({
  view,
  selectedDate,
  handleDateSelect,
}) => {
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const generateDates = () => {
    const dates = [];
    const startDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const numDays = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth());
    const prevMonthDays = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth() - 1);

    // Previous month's days
    for (let i = startDay - 1; i >= 0; i--) {
      dates.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, prevMonthDays - i));
    }

    // Current month's days
    for (let i = 1; i <= numDays; i++) {
      dates.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i));
    }

    // Next month's days
    const nextMonthDays = 42 - dates.length; // Ensure a total of 42 days (6 weeks)
    for (let i = 1; i <= nextMonthDays; i++) {
      dates.push(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, i));
    }

    return dates;
  };
  const renderDays = () => {
    const days: JSX.Element[] = [];
    dayLabels.map((label, index) => days.push(
        <div key={index} className="calendar-day-label">
          {label}
        </div>
      ))

    const dates = generateDates();
    dates.map((date, index) => {
      const isOutsideMonth = date.getMonth() !== selectedDate.getMonth();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={index}
          className={`calendar-day ${isOutsideMonth ? 'outside' : ''} ${
            isSelected ? 'selected' : ''
          } ${isToday ? 'today' : ''}`}
          onClick={() => !isOutsideMonth && handleDateSelect(date, undefined, false)}
        >
          {date.getDate()}
        </div>
      );
    })

    return days;
  };

  const renderMonths = () => {
    const months = Array.from({ length: 12 }, (_, i) => (
      <div
        className={`calendar-month ${month === i && 'selected'}`}
        key={i}
        onClick={() => handleDateSelect(new Date(selectedDate.setMonth(i)), 'date')}
      >
        {new Date(2020, i).toLocaleString('default', { month: 'long' })}
      </div>
    ));
    return months;
  };

  const renderYears = () => {
    const startYear = ((Math.floor(selectedDate.getFullYear() / 10) * 10) - 1);
    return Array.from({ length: 12 }, (_, i) => (
      <div
        className={`calendar-year ${year === startYear + i && 'selected'} ${(i === 0 || i === 11) && 'outside'}`}
        key={i}
        onClick={() => handleDateSelect(new Date(selectedDate.setFullYear(startYear + i)), 'month')}
      >
        {startYear + i}
      </div>
    ));
  };

  return (
    <div className={`calendar-body calendar-body-${view}`}>
      {view === 'date' && renderDays()}
      {view === 'month' && renderMonths()}
      {view === 'year' && renderYears()}
    </div>
  );
};

export default CalendarBody;