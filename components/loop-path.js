import React from 'react'
import ReactDOM from 'react-dom'

class LoopPath extends React.Component {
  render () {
    const {
      pathCreator,
      ...rest
    } = this.props

    return (
      <path
        fill='none'
        d={pathCreator(rest)}
      />
    )
  }

  componentDidMount () {
    const { setPath } = this.props
    const pathNode = ReactDOM.findDOMNode(this)
    setPath(pathNode)
  }
}

export default LoopPath
