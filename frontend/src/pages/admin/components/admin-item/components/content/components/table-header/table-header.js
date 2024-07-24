import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../../../../../selectors'
import PropTypes from 'prop-types'

export const TableHeader = ({ children }) => {
	const isDarkMode = useSelector(selectTheme)

	return (
		<div
			className={`sticky top-0 ${isDarkMode ? 'dark:bg-slate-700' : 'bg-white'} z-10 h-12 blue dark:title-orange flex font-bold`}
		>
			{children}
		</div>
	)
}

TableHeader.propTypes = {
	children: PropTypes.node.isRequired
}
