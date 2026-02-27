import { addHours } from 'date-fns'

export function calculateSla(priority: String): Date {
  const dateSLA = new Date()

  switch (priority) {
    case 'CRITICAL':
      return addHours(dateSLA, 4)
    case 'HIGH':
      return addHours(dateSLA, 24)
    case 'MEDIUM':
      return addHours(dateSLA, 48)
    default:
      return addHours(dateSLA, 72)
  }
}
