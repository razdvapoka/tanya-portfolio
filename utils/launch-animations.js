import anime from 'animejs'

const launch = (pathSelector, charSelector, velocity) => {
  const path = anime.path(pathSelector)
  const distance = path().totalLength
  const duration = distance / velocity
  // const velocity = v // distance / duration
  const spacing = 5

  function getWidth (node) {
    return node.getBoundingClientRect().width
  }

  const chars = Array.from(document.querySelectorAll(charSelector))

  const delays = chars.map(function (ch) {
    return (getWidth(ch) + spacing) / velocity
  })

  const milestone = (distance - getWidth(chars[chars.length - 1])) / velocity

  function sumArr (arr) {
    return arr.reduce(function (sum, next) {
      return sum + next
    }, 0)
  }

  const timeline = anime.timeline({
    duration: distance / velocity,
    easing: 'linear',
    autoplay: true,
    update: function (a) {
      if (a.currentTime >= milestone) {
        timeline.pause()
        timeline.seek(milestone - duration / 2)
        timeline.play()
      }
    },
    complete: function () {
      timeline.restart()
    }
  })

  chars.forEach(function (char, i) {
    const offset = sumArr(delays.slice(i, delays.length - 1))
    timeline.add({
      targets: char,
      offset: offset,
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      begin: function () {
        char.style.opacity = 1
      },
      complete: function () {
        char.style.opacity = 0
      }
    })
  })
}

export default launch
