export function getYearMonthFromDate (date: Date): string {
  return date.getFullYear().toString() + '-' + date.getMonth().toString().padStart(2,'0')
}
