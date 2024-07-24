import PropTypes from 'prop-types'

export const AuthError = ({ className, children }) => {
	return (
		<div className={`text-red-600 text-wrap ${className}`}>{children}</div>
	)
}

AuthError.propTypes = {
	children: PropTypes.node.isRequired
}
