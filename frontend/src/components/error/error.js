import { PROP_TYPE } from '../../constants'

export const Error = ({ error }) => {
	return (
		error && (
			<div className='flex items-center justify-center w-full h-screen mt-[-160px]'>
				<div className='flex flex-col items-center justify-center w-full h-full bg-cover bg-no-repeat tablet:bg-404-pattern tablet:w-[600px] tablet:h-[450px] laptop:w-[750px] laptop:h-[500px] minDesktop:w-[850px] minDesktop:h-[610px]'>
					<h2 className='font-medium text-2xl'>Ошибка</h2>
					<div className='mt-2'>{error}</div>
				</div>
			</div>
		)
	)
}

Error.propTypes = {
	error: PROP_TYPE.ERROR
}
