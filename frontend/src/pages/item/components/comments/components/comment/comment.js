import { useDispatch, useSelector } from 'react-redux'
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync
} from '../../../../../../actions'
import { Icon } from '../../../../../../components/icon/icon'
import { checkAccess } from '../../../../../../utils'
import { ROLE } from '../../../../../../constants'
import { selectUserRole } from '../../../../../../selectors'
import PropTypes from 'prop-types'

export const Comment = ({ itemId, id, author, publishedAt, content }) => {
	const dispatch = useDispatch()
	const userRole = useSelector(selectUserRole)

	const onCommentRemove = (id) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return
		}

		dispatch(
			openModal({
				text: 'Вы действительно хотите удалить этот комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(itemId, id))
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL)
			})
		)
	}

	const isAdmin = checkAccess([ROLE.ADMIN], userRole)

	return (
		<div>
			<div className='relative'>
				{isAdmin && (
					<div className='absolute right-2 text-2xl pt-1 pr-1'>
						<Icon
							icon='bi-x cursor-pointer'
							onClick={() => onCommentRemove(id)}
						/>
					</div>
				)}

				<div className='pt-8 pl-10 pb-8 pr-10'>
					<div className='info-panel flex items-center'>
						{/* автор */}
						<div className='author flex items-center'>
							<div className='author-image flex items-center justify-center w-[60px] h-[60px] bg-slate-100 rounded-full'>
								<Icon className='bi-person-fill text-3xl text-gray-500' />
							</div>

							<div className='pl-3'>
								<div className='author-name text-base'>
									{author}
								</div>
								{/* дата комментария */}
								<div className='author-name text-sm text-gray-400'>
									{publishedAt}
								</div>
							</div>
						</div>
					</div>
					{/* сам комментарий */}
					<div className='text-content mt-3'>{content}</div>
				</div>
			</div>
		</div>
	)
}

Comment.propTypes = {
	itemId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired
}
