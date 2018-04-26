/* @flow */

import TimeFormat from 'hh-mm-ss'

export const formatDuration = (duration: ?string) => {
  if (!duration) {
    duration = '00:00:00.00'
  }
  const roundedTime: number = Math.floor(
    TimeFormat.toS(duration, 'hh:mm:ss.sss')
  )

  return TimeFormat.fromS(
    roundedTime,
    roundedTime >= 3600 ? 'hh:mm:ss' : 'mm:ss'
  )
}
