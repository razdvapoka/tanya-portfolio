import { repeat } from './repeat'

export const randomPath = ({ width, height, pointCount = 20 }) => {
  const points =
    [ ...Array(pointCount) ]
      .map(_ => `${Math.random() * width},${Math.random() * height}`)
  return `M ${points.join(' ')} Z`
}

export const doubleRectPath = ({ width, height, shift }) => {
  const singlePath = `
      ${shift},${shift}
      ${width - shift},${shift}
      ${width - shift},${height - shift}
      ${shift},${height - shift}
    `
  return `M ${repeat(2, singlePath)} Z`
}
