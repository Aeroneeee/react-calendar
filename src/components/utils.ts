export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getStartDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};