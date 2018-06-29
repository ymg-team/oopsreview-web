export function epochToRelative(epochtime: number): string {
  const lang = {
    postfixes: {
      '<': ' latter',
      '>': ' ago'
    },
    1000: {
      singular: 'a moment',
      plural: 'a moments'
    },
    60000: {
      singular: 'a minute',
      plural: '# minutes'
    },
    3600000: {
      singular: 'a hour',
      plural: '# hours'
    },
    86400000: {
      singular: 'a day',
      plural: '# days'
    },
    2592000000: {
      singular: 'a month',
      plural: '# months'
    },
    31540000000: {
      singular: 'a year',
      plural: '# years'
    }
  }

  const now = Date.now()
  const timespans = [1000, 60000, 3600000, 86400000, 2592000000, 31540000000]
  let timeDifference = now - epochtime * 1000
  const postfix = lang.postfixes[timeDifference < 0 ? '<' : '>']
  let timespan = timespans[0]

  if(timeDifference < 0) timeDifference = timeDifference * -1

  for (let i = 1; i < timespans.length; i++) {
    if (timeDifference > timespans[i]) {
      timespan = timespans[i]
    }
  }

  const n = Math.round(timeDifference / timespan)

  return lang[timespan][n > 1 ? 'plural' : 'singular'].replace('#', n) +  postfix
}
