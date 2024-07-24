import { useSelector } from 'react-redux'
import { selectTheme } from '../../../../selectors'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const Snipet = ({
	id,
	imageUrl,
	title,
	price,
	content,
	categoryName
}) => {
	const isDarkMode = useSelector(selectTheme)

	return (
		<div className='w-full '>
			<Link to={`/item/${id}`} className='block w-full'>
				<div
					className={`flex flex-col laptop:flex-row w-full h-full gap-4 laptop:gap-0 p-4 rounded shadow-sm ${
						isDarkMode ? 'bg-gray-700' : 'bg-white'
					}`}
				>
					<img
						className='w-full laptop:w-[200px] h-[150px] object-cover rounded'
						src={imageUrl}
						alt={title}
					/>
					<div
						className={`flex flex-col justify-between w-full items-start mt-0 laptop:mt-4`}
					>
						<div className='md:text-xl font-bold'>{title}</div>
						<div
							className={`text-lg md:text-lg font-semibold ${
								isDarkMode ? 'title-orange' : 'blue'
							}`}
						>
							{price} ₽
						</div>

						<div>{content}</div>
						<div
							className={`text-sm md:text-base ${
								isDarkMode ? 'title-orange' : 'blue'
							}`}
						>
							{categoryName}
						</div>
					</div>
				</div>
			</Link>
		</div>
	)
}

Snipet.propTypes = {
	id: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	content: PropTypes.string.isRequired,
	categoryName: PropTypes.string.isRequired
}
