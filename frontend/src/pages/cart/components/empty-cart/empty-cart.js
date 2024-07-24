import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../components/button/button'

export const EmptyCart = () => {
	const navigate = useNavigate()

	const onGoToMain = () => {
		navigate('/')
	}

	return (
		<div className='flex items-center justify-center w-full'>
			<div className='relative w-full h-full tablet:w-[600px] tablet:h-[450px] mobile:w-[500px] mobile:h-[400px] laptop:w-[750px] laptop:h-[500px] minDesktop:w-[850px] minDesktop:h-[610px]'>
				<div className='flex flex-col items-center justify-center gap-3'>
					<div className='text-center text-gray-500 mt-2'>
						Ваша корзина пуста
					</div>

					<Button onClick={onGoToMain} className='button mb-4'>
						Отправиться за покупками
					</Button>
				</div>
				<div className='w-full h-full bg-cover bg-no-repeat tablet:bg-empty-cart-pattern'></div>
			</div>
		</div>
	)
}
