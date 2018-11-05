const debounce = (f, interval) => {
  let timeoutHandle = null
  return (...args) => {
    clearTimeout(timeoutHandle)
    timeoutHandle = setTimeout(() => f(...args), interval)
  }
}

export {
  debounce
}
