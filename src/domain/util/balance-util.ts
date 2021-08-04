export function getYearMonthFromDate (date: Date): string {
  return date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2,'0')
}
