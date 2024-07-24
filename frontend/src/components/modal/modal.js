import { useSelector } from 'react-redux'
import { Button } from '../button/button'
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
	selectTheme
} from '../../selectors'

export const Modal = () => {
	const isOpen = useSelector(selectModalIsOpen)
	const text = useSelector(selectModalText)
	const onCancel = useSelector(selectModalOnCancel)
	const onConfirm = useSelector(selectModalOnConfirm)

	const isDarkMode = useSelector(selectTheme)

	if (!isOpen) {
		return null
	}

	return (
		<div className='fixed inset-0 z-20 flex items-center justify-center'>
			<div className='absolute inset-0 bg-gray-800 opacity-60'></div>
			<div
				className={`relative flex flex-col text-center items-center justify-center w-[400px] p-12 text-wrap rounded shadow ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
			>
				<h3 className='flex items-center dark:text-white justify-center text-xl font-normal'>
					{text}
				</h3>

				<div className='flex justify-between mt-4 gap-3'>
					<Button className='button-cancel' onClick={onCancel}>
						Отмена
					</Button>
					<Button className='button' onClick={onConfirm}>
						Удалить
					</Button>
				</div>
			</div>
		</div>
	)
}
