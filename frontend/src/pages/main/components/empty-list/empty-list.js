export const EmptyList = () => {
	return (
		<div className='flex items-center justify-center w-full text-lg mt-16'>
			<div className='flex flex-col items-center w-full h-full'>
				<div className='text-gray-500'>Товар не найден</div>
				<div className='mt-10 w-[204px] h-[200px] bg-no-data bg-cover bg-no-repeat tablet:w-[205px] tablet:h-[200px] laptop:w-[257px] laptop:h-[250px] minDesktop:w-[307px] minDesktop:h-[300px]'></div>
			</div>
		</div>
	)
}
