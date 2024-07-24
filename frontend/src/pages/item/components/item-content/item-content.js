import { Button, ColorLink } from '../../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems, selectTheme } from '../../../../selectors'
import { useState } from 'react'
import { addToCart } from '../../../../actions'
import { Link } from 'react-router-dom'
import { PROP_TYPE } from '../../../../constants'

export const ItemContent = ({
	item: {
		id,
		title,
		brand,
		price,
		count,
		imageUrl,
		content,
		categoryName,
		commentsCount
	}
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
		<div className='mobile:w-[570px] tablet:w-[640px] laptop:w-[1024px] minDesktop:w-[1280px] desktop:w-[1536px] pl-6 pr-6'>
			{/* breadcrumbs */}
			<div className='flex text-sm mb-6'>
				<i
					className={`bi bi-arrow-left text-base ${isDarkMode ? 'title-orange' : 'blue'}`}
				/>
				<ColorLink page='Главная /' route='/' />
				<div className='ml-2'>{title}</div>
			</div>

			{/* content item */}
			<div className='flex flex-col minDesktop:flex-row items-start justify-between'>
				<img
					className='w-full minDesktop:w-[500px] h-[400px] object-cover mb-8 minDesktop:mb-0 minDesktop:mr-16 rounded shadow'
					src={imageUrl}
					alt={title}
				/>

				<div className='flex flex-col justify-between h-auto minDesktop:h-[400px] w-full minDesktop:w-auto'>
					{/* название товара */}
					<h2 className='text-2xl minDesktop:text-4xl font-bold  minDesktop:mb-0 mb-4'>
						{title}
					</h2>

					{/* продавец */}
					<div className='flex items-center gap-2 mb-4'>
						<i className='bi bi-shop' />
						<div>{brand}</div>

						{/* осталось */}
						<div className='flex blue ml-4'>
							<p
								className={`${isDarkMode ? 'title-orange' : 'blue'}`}
							>
								Осталось:
							</p>
							<p
								className={`${isDarkMode ? 'title-orange' : 'blue'} pl-2`}
							>
								{count}
							</p>
							<p
								className={`${isDarkMode ? 'title-orange' : 'blue'} ml-1`}
							>
								шт.
							</p>
						</div>
					</div>

					{/* описание товара */}
					<div className='mb-2 max-h-[150px] overflow-auto'>
						<p>{content}</p>
					</div>

					{/* доставка */}
					<div className='flex mb-2'>
						<p>Доставка:</p>
						<p
							className={`${isDarkMode ? 'title-orange' : 'blue'} ml-2`}
						>
							послезавтра
						</p>
					</div>

					{/* цена */}
					<div
						className={`${isDarkMode ? 'title-orange' : 'blue'} text-xl font-bold mb-4`}
					>
						Цена: {price} ₽
					</div>

					{/* кнопка */}
					{isAdded ? (
						<Button className='button-added w-[200px] h-12'>
							<Link to='/cart'>В корзине</Link>
						</Button>
					) : (
						<Button
							className='button w-[200px] h-12 mt-auto minDesktop:mt-0'
							disabled={isAdded}
							onClick={onBuy}
						>
							Добавить в корзину
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

ItemContent.propTypes = {
	item: PROP_TYPE.ITEM.isRequired
}
