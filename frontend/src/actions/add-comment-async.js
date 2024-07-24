import { request } from '../utils'
import { addComment } from './add_comment'

export const addCommentAsync = (itemId, content) => (dispatch) => {
	request(`/items/${itemId}/comments`, 'POST', { content }).then(
		(comment) => {
			dispatch(addComment(comment.data))
		}
	)
}
