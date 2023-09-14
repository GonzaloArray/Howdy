import dayjs from 'dayjs'

export const formatDate = (seconds, nanoseconds) => {
  const now = dayjs()

  const messageDate = dayjs.unix(seconds)

  const isSameDay = now.isSame(messageDate, 'day')

  if (isSameDay) {
    return messageDate.format('HH:mm')
  } else if (now.diff(messageDate, 'day') === 1) {
    return 'Ayer'
  } else {
    return messageDate.format('D/M/YYYY')
  }
}
