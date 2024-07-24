import PropTypes from 'prop-types'

export const ColumnName = ({ className, name, children }) => {
	return (
		<div className={`${name}-column flex w-1/4 items-center  ${className}`}>
			{children}
		</div>
	)
}

ColumnName.propTypes = {
	name: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
}
