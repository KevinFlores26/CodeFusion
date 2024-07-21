import PropTypes from 'prop-types'

export default function ConsoleOutput({ type, icon, message }) {
  return (
    <li className={`ConsoleOutput-item --${type}`}>
      {icon}
      <pre className='ConsoleOutput-message'>{message}</pre>
    </li>
  )
}

ConsoleOutput.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  message: PropTypes.string.isRequired,
}
