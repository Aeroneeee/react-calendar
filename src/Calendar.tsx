import React, { useState } from 'react';
import './Calendar.css';

interface CalendarProps {
  date?: Date;
  onSelect?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ date = new Date(), onSelect }) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [view, setView] = useState<'date' | 'month' | 'year'>('date');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (onSelect) onSelect(date);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getStartDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div className="calendar-day empty" key={`empty-${i}`} />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      const isSelected =
        selectedDate && dayDate.toDateString() === selectedDate.toDateString();
      const isToday = new Date().toDateString() === dayDate.toDateString();
      days.push(
        <div
          className={`calendar-day ${isSelected ? 'selected' : ''} ${
            isToday ? 'today' : ''
          }`}
          key={i}
          onClick={() => handleDateSelect(dayDate)}
        >
          {i}
        </div>
      );
    }

    return <div className="calendar-days">{days}</div>;
  };
  const renderMonths = () => {
    const months = Array.from({ length: 12 }, (_, i) => (
      <div
        className="calendar-month"
        key={i}
        onClick={() => {
          setCurrentDate(new Date(currentDate.setMonth(i)));
          setView('date');
        }}
      >
        {new Date(2020, i).toLocaleString('default', { month: 'long' })}
      </div>
    ));
    return <div className="calendar-months">{months}</div>;
  };

  const renderYears = () => {
    const years = Array.from({ length: 12 }, (_, i) => (
      <div
        className="calendar-year"
        key={i}
        onClick={() => {
          setCurrentDate(
            new Date(currentDate.setFullYear(currentDate.getFullYear() + i - 6))
          );
          setView('month');
        }}
      >
        {currentDate.getFullYear() + i - 6}
      </div>
    ));
    return <div className="calendar-years">{years}</div>;
  };
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() - 1))
            )
          }
        >
          &lt;
        </button>
        <button onClick={() => setView('month')}>
          {currentDate.toLocaleString('default', { month: 'long' })}{' '}
          {currentDate.getFullYear()}
        </button>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() + 1))
            )
          }
        >
          &gt;
        </button>
      </div>
      <div className="calendar-body">
        {view === 'date' && renderDays()}
        {view === 'month' && renderMonths()}
        {view === 'year' && renderYears()}
      </div>
    </div>
  );
};

export default Calendar;
