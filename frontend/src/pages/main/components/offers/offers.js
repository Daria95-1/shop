import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const OfferBanner = ({ className, text, bgClass }) => {
	const navigate = useNavigate()

	const onGoToCategories = () => {
		navigate('/categories')
	}

	return (
		<div
			onClick={onGoToCategories}
			className={`relative flex items-center justify-center w-full tablet:w-[calc(50%-1rem)] laptop:w-[calc(25%-1rem)] h-[150px] uppercase text-white text-xl md:text-lg mobile:text-lg shadow font-bold rounded ${className} cursor-pointer`}
		>
			<div
				className={`absolute inset-0 w-full h-full ${bgClass} bg-cover bg-no-repeat opacity-40 rounded`}
			></div>
			<p className='relative text-shadow'>{text}</p>
		</div>
	)
}

export const Offers = () => {
	return (
		<div className='flex flex-col items-center tablet:flex-row justify-center tablet:justify-between mt-4 tablet:flex-wrap'>
			<OfferBanner
				className='bg-gradient-to-r from-orange-500 to-red-500'
				bgClass='bg-offer-1'
				text='Новая коллекция'
			/>

			<OfferBanner
				className='bg-gradient-to-r from-green-600 to-lime-400 mt-2'
				bgClass='bg-offer-2'
				text='Летняя распродажа'
			/>

			<OfferBanner
				className='bg-gradient-to-r from-yellow-300 to-orange-500 mt-2'
				bgClass='bg-offer-3'
				text='Все для дома'
			/>

			<OfferBanner
				className='bg-gradient-to-r from-violet-500 to-fuchsia-500 mt-2'
				bgClass='bg-offer-4'
				text='Большая скидка'
			/>
		</div>
	)
}

Offers.propTypes = {
	text: PropTypes.string,
	bgClass: PropTypes.string
}
