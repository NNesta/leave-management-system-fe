export const countWorkingDays = (
  startDateStr: string,
  endDateStr: string,
  publicHolidays: string[] = []
) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  let count = 0;

  // Normalize public holidays to ISO strings for easy comparison
  const holidaySet = new Set(
    publicHolidays.map((d) => new Date(d).toDateString())
  );

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const day = date.getDay(); // 0 (Sun) to 6 (Sat)
    const dateStr = date.toDateString();

    const isWeekend = day === 0 || day === 6;
    const isHoliday = holidaySet.has(dateStr);

    if (!isWeekend && !isHoliday) {
      count++;
    }
  }

  return count;
};
