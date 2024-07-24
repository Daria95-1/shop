import PropTypes from 'prop-types'

export const Button = ({ children, className, ...props }) => {
	return (
		<button
			className={`flex items-center justify-center h-10 text-base rounded-3xl pl-6 pr-6 ${className}`}
			type='submit'
			{...props}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.node.isRequired
}
