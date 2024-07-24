import { useNavigate } from 'react-router-dom'

export const Banner = () => {
	const navigate = useNavigate()

	const onGoToCategories = () => {
		navigate('/categories')
	}

	return (
		<div
			onClick={onGoToCategories}
			className='relative flex items-center justify-center uppercase text-white text-5xl sm:text-9xl font-black tracking-widest bg-gradient-to-r from-sky-500 to-indigo-500 w-full h-[200px] rounded cursor-pointer'
		>
			<div className='absolute inset-0 w-full h-full bg-banner bg-cover bg-no-repeat opacity-90 rounded'></div>
		</div>
	)
}
