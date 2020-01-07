const fixZero = (n: number): string => (n < 10 ? `0${n}` : `${n}`)

export default function formatTime(
  time: number | Date,
  format: string = 'yyyy-MM-dd hh:mm:ss'
): string {
  const date: Date = typeof time === 'number' ? new Date(time) : time

  return format
    .replace(/yyyy/, date.getFullYear() + '')
    .replace(/MM/, fixZero(date.getMonth() + 1))
    .replace(/dd/, fixZero(date.getDate()))
    .replace(/hh/, fixZero(date.getHours()))
    .replace(/mm/, fixZero(date.getMinutes()))
    .replace(/ss/, fixZero(date.getSeconds()))
}
