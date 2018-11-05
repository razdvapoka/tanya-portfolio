import anime from 'animejs'

const getSize = node => {
  const { width, height } = node.getBoundingClientRect()
  return { width, height }
}
const getWidth = node => getSize(node).width
const last = arr => arr[arr.length - 1]
const hideCharHandler = (char) => () => { char.style.opacity = 0 }
const showCharHandler = (char) => () => { char.style.opacity = 1 }
const sumArr = (arr) => arr.reduce((sum, next) => sum + next, 0)

const textLoopTimeline = (pathSelector, charSelector, velocity, spacing = 5) => {
  const path = anime.path(pathSelector)
  const distance = path().totalLength
  const duration = distance / velocity
  const chars = Array.from(document.querySelectorAll(charSelector))
  const delays = chars.map(char => (getWidth(char) + spacing) / velocity)
  const milestone = (distance - getWidth(last(chars))) / velocity

  const timeline = anime.timeline({
    duration: distance / velocity,
    easing: 'linear',
    autoplay: false,
    update: (a) => {
      if (a.currentTime >= milestone) {
        timeline.pause()
        timeline.seek(milestone - duration / 2)
        timeline.play()
      }
    },
    complete: () => {
      timeline.restart()
    }
  })

  chars.forEach((char, i) => {
    const offset = sumArr(delays.slice(i, delays.length - 1))
    timeline.add({
      targets: char,
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      begin: showCharHandler(char),
      complete: hideCharHandler(char),
      offset
    })
  })

  const start = (distance / 2 - getWidth(last(chars))) / velocity
  timeline.seek(start)

  return timeline
}

export {
  textLoopTimeline
}
