import React from 'react';
import { CalendarHeaderProps } from './types';

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  setCurrentDate,
  view,
  setView,
}) => {
  const handlePrev = () => {
    if (view === 'date') {
      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    } else if (view === 'month') {
      setCurrentDate(new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)));
    } else {
      setCurrentDate(new Date(currentDate.setFullYear(currentDate.getFullYear() - 10)));
    }
  };

  const handleNext = () => {
    if (view === 'date') {
      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    } else if (view === 'month') {
      setCurrentDate(new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)));
    } else {
      setCurrentDate(new Date(currentDate.setFullYear(currentDate.getFullYear() + 10)));
    }
  };

  const switchView = () => {
    if (view === 'date') {
      setView('month');
    } else if (view === 'month') {
      setView('year');
    }
  };

  return (
    <div className="calendar-header">
      <button onClick={handlePrev}>&lt;</button>
      <button onClick={switchView}>
        {view === 'date'
          ? `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`
          : view === 'month'
          ? currentDate.getFullYear()
          : `${Math.floor(currentDate.getFullYear() / 10) * 10}-${Math.floor(currentDate.getFullYear() / 10) * 10 + 9}`}
      </button>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default CalendarHeader;