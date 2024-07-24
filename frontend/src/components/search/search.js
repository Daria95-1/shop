import { useDispatch, useSelector } from 'react-redux'
import { selectSearchPhrase, selectTheme } from '../../selectors'
import { Icon } from '../icon/icon'
import { useMemo } from 'react'
import { setSearchPhrase, setShouldSearch } from '../../actions'
import PropTypes from 'prop-types'
import { debounce } from '../../pages/utils'

export const Search = ({ className, text }) => {
	const isDarkMode = useSelector(selectTheme)
	const dispatch = useDispatch()

	const searchPhrase = useSelector(selectSearchPhrase)

	const startDelayedSearch = useMemo(
		() => debounce(() => dispatch(setShouldSearch()), 2000),
		[dispatch]
	)

	const onSearch = ({ target }) => {
		dispatch(setSearchPhrase(target.value))
		startDelayedSearch()
	}

	return (
		<div className='relative'>
			<Icon
				icon={`bi-search search-icon ${isDarkMode ? 'dark:text-white' : 'text-gray-300'}`}
			/>
			<input
				className={`${className} ${isDarkMode ? 'dark:bg-slate-700 border-white' : 'bg-white border-gray-300'} text-base`}
				placeholder={text}
				defaultValue={searchPhrase}
				onChange={onSearch}
			/>
		</div>
	)
}

Search.propTypes = {
	text: PropTypes.string
}
