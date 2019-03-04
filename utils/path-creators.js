import { repeat } from './repeat'

export const randomPath = ({ width, height, pointCount = 20 }) => {
  const points =
    [ ...Array(pointCount) ]
      .map(_ => `${Math.random() * width},${Math.random() * height}`)
  return `M ${points.join(' ')} Z`
}

export const doubleRectPath = ({ width, height, shift, padding }) => {
  const paddedShift = shift + padding
  const singlePath = `
      ${paddedShift},${paddedShift}
      ${width - paddedShift},${paddedShift}
      ${width - paddedShift},${height - paddedShift}
      ${paddedShift},${height - paddedShift}
    `
  return `M ${repeat(2, singlePath)} Z`
}
