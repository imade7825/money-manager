import { driver } from 'driver.js'
import { getSteps } from './steps'

const KEY = 'hasSeenTour'

function createDriver() {
  return driver({
    showProgress: true,
    allowClose: true,
    overlayOpacity: 0.5,
    stagePadding: 4,
    popoverClass: 'mm-tour', // optional: for theming via CSS
    steps: getSteps(),
  })
}

export function startTour() {
  const d = createDriver()
  d.drive()
}

export function restartTour() {
  localStorage.removeItem(KEY)
  startTour()
}

export function maybeStartTour() {
  try {
    if (typeof window === 'undefined') return
    const seen = localStorage.getItem(KEY)
    if (seen === 'true') return
    const d = createDriver()
    d.drive()
    d.on('destroyed', () => {
      localStorage.setItem(KEY, 'true')
    })
  } catch {
    // fail silently
  }
}