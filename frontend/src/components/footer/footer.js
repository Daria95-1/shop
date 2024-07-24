import 'bootstrap-icons/font/bootstrap-icons.css'

export const Footer = () => {
	return (
		<div className='blue-bg flex items-center justify-center w-full h-14 text-white'>
			<div className='flex items-center justify-between w-full mobile:w-[570px] tablet:w-[640px] laptop:w-[1024px] minDesktop:w-[1280px] desktop:w-[1536px] pl-6 pr-6'>
				<div className='flex gap-2'>
					<p>Дипломный проект</p>
					<p className='font-medium'>Дарьи Басыниной</p>
				</div>

				<div>2024</div>
			</div>
		</div>
	)
}
