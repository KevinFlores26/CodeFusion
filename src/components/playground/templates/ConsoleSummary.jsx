import PropTypes from 'prop-types'

export default function ConsoleSummary({ icon, type, count }) {
  if (count < 0) count = 0

  return (
    <li className={`ConsoleSummary-item --${type}`}>
      <div className='ConsoleSummary-iconContainer'>{icon}</div>

      <div className='ConsoleSummary-content'>
        <strong className='ConsoleSummary-type'>{`${type}s`}</strong>
        <span className='ConsoleSummary-count'>{count}</span>
      </div>
    </li>
  )
}

ConsoleSummary.propTypes = {
  icon: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
}
