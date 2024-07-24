import { useState } from 'react'
import { Comment } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme, selectUserRole } from '../../../../selectors'
import { addCommentAsync } from '../../../../actions'
import { Button, Icon, Modal } from '../../../../components'
import { PROP_TYPE, ROLE } from '../../../../constants'
import PropTypes from 'prop-types'

export const Comments = ({ comments, itemId }) => {
	const [newComment, setNewComment] = useState('')
	const userRole = useSelector(selectUserRole)
	const dispatch = useDispatch()

	const isDarkMode = useSelector(selectTheme)

	const onNewCommentAdd = (itemId, content) => {
		dispatch(addCommentAsync(itemId, content))
		setNewComment('')
	}

	return (
		<>
			<div className='flex flex-col'>
				<div className='flex flex-col pl-6 pr-6'>
					{userRole !== ROLE.GUEST && (
						<div className='flex flex-col items-start justify-start'>
							<div className='flex  w-full mt-10'>
								<textarea
									className={`texterea ${isDarkMode ? 'dark:bg-slate-700' : 'bg-gray-100'} border-solid w-full border-1 rounded h-[80px] resize-none pt-3 pl-4`}
									name='comment'
									value={newComment}
									placeholder='Комментарий...'
									onChange={({ target }) =>
										setNewComment(target.value)
									}
								></textarea>

								{newComment && (
									<div
										className={`absolute top-2 right-2 text-lg cursor-pointer ${isDarkMode ? 'dark:bg-slate-700' : 'bg-white'}`}
									>
										<Icon
											icon='bi-x '
											onClick={() => setNewComment('')}
										/>
									</div>
								)}
							</div>

							<Button
								className='button h-12 mt-6'
								disabled={userRole === ROLE.GUEST}
								onClick={() =>
									onNewCommentAdd(itemId, newComment)
								}
							>
								Отправить
							</Button>
						</div>
					)}

					<div className='flex flex-col gap-3 mt-10'>
						{comments.map(
							({ id, author, content, publishedAt }) => (
								<div
									className={`${isDarkMode ? 'dark:bg-slate-700' : 'bg-white'} w-full h-full text-sm text-wrap rounded border`}
									key={id}
								>
									<Comment
										itemId={itemId}
										id={id}
										author={author}
										content={content}
										publishedAt={publishedAt}
									/>
								</div>
							)
						)}
					</div>
				</div>
			</div>

			<Modal />
		</>
	)
}

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	itemId: PropTypes.string.isRequired
}
