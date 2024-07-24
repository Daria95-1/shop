import { useSelector } from 'react-redux'
import { selectTheme } from '../../selectors'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const ColorLink = ({ page, route }) => {
	const isDarkMode = useSelector(selectTheme)

	return (
		<Link
			className={`${isDarkMode ? 'title-orange' : 'blue'} ml-2`}
			to={route}
		>
			{page}
		</Link>
	)
}

ColorLink.propTypes = {
	page: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired
}
