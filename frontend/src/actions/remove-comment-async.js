import { request } from '../utils'
import { removeComment } from './remove_comment'

export const removeCommentAsync = (itemId, id) => (dispatch) => {
	request(`/items/${itemId}/comments/${id}`, 'DELETE').then(() => {
		dispatch(removeComment(id))
	})
}
