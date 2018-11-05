import { repeat } from './repeat'

export const randomPath = ({ width, height }) => {
  const points = [ ...Array(20) ].map(_ => `${Math.random() * width},${Math.random() * height}`)
  return `M ${points.join(' ')} Z`
}

export const rectPath = ({ width, height, shift }) => {
  const singlePath = `
      ${shift},${shift}
      ${width - shift},${shift}
      ${width - shift},${height - shift}
      ${shift},${height - shift}
    `
  return `M ${repeat(2, singlePath)} Z`
}
