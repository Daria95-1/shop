import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon } from '../../../../components'
import { selectCartItems, selectTheme } from '../../../../selectors'
import { Link } from 'react-router-dom'
import { addToCart } from '../../../../actions'
import { useState } from 'react'
import { getReviewWord } from '../../../utils'
import PropTypes from 'prop-types'

export const Product = ({
	id,
	imageUrl,
	title,
	price,
	brand,
	count,
	categoryName,
	commentsCount
}) => {
	const isDarkMode = useSelector(selectTheme)
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)
	const [isAdded, setIsAdded] = useState(
		cartItems.some((item) => item.id === id)
	)

	const onBuy = () => {
		dispatch(
			addToCart({
				id,
				imageUrl,
				title,
				price,
				brand,
				count,
				categoryName,
				commentsCount
			})
		)
		setIsAdded(true)
	}

	return (
		<div className='flex flex-col justify-center w-full mobil:w-[370px] tablet:w-[calc(50%-1rem)] laptop:w-[calc(1/3*100%-1rem)} minDesktop:w-[calc(1/4*100%-1rem)] desktop:w-[calc(1/6*100%-1rem)] dark:bg-gray-700 mb-4 rounded'>
			<div className={`flex flex-col w-full items-start shadow-sm `}>
				<Link to={`/item/${id}`} className='block'>
					<div className='relative w-full'>
						<img
							className='w-full min-h-[300px] mobil:w-full mobil:h-full  object-cover rounded-tl-md rounded-tr-md'
							src={imageUrl}
							alt={title}
						/>
						{count < 10 && (
							<div className='absolute top-3 right-3 p-2 orange text-gray-900 text-xs font-medium rounded opacity-75'>
								Осталось всего: {count} шт.
							</div>
						)}
					</div>
					<div className='rounded p-4 gap-2'>
						<div
							className={`text-lg md:text-xl font-bold ${
								isDarkMode ? 'title-orange' : 'blue'
							}`}
						>
							{price} ₽
						</div>
						<div className='text-base md:text-lg'>{title}</div>

						<div
							className={`text-sm md:text-base ${
								isDarkMode ? 'title-orange' : 'blue'
							}`}
						>
							{categoryName}
						</div>
						<div className='flex gap-1 text-sm text-gray-400'>
							<div>•</div>
							<div>{commentsCount}</div>
							<div>{getReviewWord(commentsCount)}</div>
						</div>
					</div>
				</Link>
				<div className='flex justify-center w-full pl-4 pr-4 pb-4'>
					{isAdded ? (
						<Button className='button-added w-full'>
							<Link to='/cart'>В корзине</Link>
						</Button>
					) : (
						<Button
							className='button w-full gap-2'
							type='submit'
							onClick={onBuy}
							disabled={isAdded}
						>
							<Icon className='bi-basket-fill' />
							<div>Добавить</div>
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

Product.propTypes = {
	id: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	brand: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	categoryName: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired
}
