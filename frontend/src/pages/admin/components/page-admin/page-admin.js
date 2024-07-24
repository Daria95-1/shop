import { Icon } from '../../../../components'

export const PageAdmin = () => {
	return (
		<div className='flex flex-col text-center justify-center w-full h-full text-wrap text-lg font-normal'>
			В панели администратора вы можете управлять товарами,
			пользователями, доставками, а также настройками своего профиля.
			<div className='flex justify-center gap-3'>
				<Icon className='mt-4 text-4xl' icon='bi-emoji-smile' />
				<Icon className='mt-4 text-4xl' icon='bi-emoji-smile' />
				<Icon className='mt-4 text-4xl' icon='bi-emoji-smile' />
			</div>
		</div>
	)
}
