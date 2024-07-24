import { Icon } from '../../../../components'

export const PageInProgress = () => {
	return (
		<div className='flex flex-col items-center justify-center w-full h-full text-wrap text-lg font-normal'>
			<div className='mr-2'>
				В данный момент страница находится в разработке.
			</div>
			<div>Попробуйте зайти позднее...</div>
			<Icon className='mt-4 text-4xl' icon='bi-emoji-smile' />
		</div>
	)
}
