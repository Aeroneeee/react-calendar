
export type View = 'date' | 'month' | 'year'

export interface CalendarProps {
    date?: Date;
    onSelect?: (date: Date, showCalendar: boolean) => void;
}

export interface CalendarBodyProps {
    // currentDate: Date;
    view: View;
    selectedDate: Date;
    handleDateSelect: (date: Date, newView?: View, showCalendar?: boolean) => void;
}

export interface CalendarHeaderProps {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    view: 'date' | 'month' | 'year';
    setView: (view: 'date' | 'month' | 'year') => void;
}


export interface DateCellProps {
    date?: number;
    isSelected?: boolean;
    isToday?: boolean;
    isEmpty?: boolean;
    onClick?: () => void;
}