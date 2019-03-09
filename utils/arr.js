export const partition = (size, arr) => arr.reduce((result, item, index) => {
  return (index % size === 0)
    ? result.concat([ [ item ] ])
    : result.slice(0, result.length - 1).concat(
      [ result[result.length - 1].concat(item) ]
    )
}, [])
