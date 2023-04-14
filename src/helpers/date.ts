// Month calc starts at 0! So, January = 0, December = 11!
const summerStartMonth = 3,
  winterStartMonth = 9;
const today = new Date();

export function getNextSemesterStartDateAsIso(): string {
  const start = new Date('2001-01-01');

  if (today.getMonth() < summerStartMonth) {
    // Next Semester will be summer semester in this year!
    start.setUTCMonth(summerStartMonth);
    start.setUTCFullYear(today.getUTCFullYear());
  } else if (today.getMonth() < winterStartMonth) {
    // Next Semester will be winter semester this year!
    start.setUTCMonth(winterStartMonth);
    start.setUTCFullYear(today.getUTCFullYear());
  } else {
    // Next Semester will be summer semester next year!
    start.setUTCMonth(summerStartMonth);
    start.setUTCFullYear(today.getUTCFullYear() + 1);
  }

  return start.toISOString().slice(0, 10);
}

export function getNextSemesterEndDateAsIso(): string {
  const end = new Date('2001-01-01');

  if (today.getMonth() < summerStartMonth) {
    // Next Semester will be summer semester in this year!
    end.setUTCMonth(winterStartMonth);
    end.setUTCFullYear(today.getUTCFullYear());
  } else if (today.getMonth() < winterStartMonth) {
    // Next Semester will be winter semester this year!
    end.setUTCMonth(summerStartMonth);
    end.setUTCFullYear(today.getUTCFullYear() + 1);
  } else {
    // Next Semester will be summer semester next year!
    end.setUTCMonth(winterStartMonth);
    end.setUTCFullYear(today.getUTCFullYear() + 1);
  }

  return end.toISOString().slice(0, 10);
}

export function getTodayAsIso(): string {
  return today.toISOString().slice(0, 10);
}
