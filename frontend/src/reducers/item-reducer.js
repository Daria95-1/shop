import { ACTION_TYPE } from '../actions'

const initialItemState = {
	id: '',
	title: '',
	brand: '',
	category: '',
	price: '',
	count: '',
	imageUrl: '',
	content: '',
	categoryId: '',
	categoryName: '',
	comments: []
}

export const itemReducer = (state = initialItemState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, action.payload]
			}

		case ACTION_TYPE.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment.id !== action.payload
				)
			}

		case ACTION_TYPE.SET_ITEM_DATA:
			return {
				...state,
				...action.payload
			}

		case ACTION_TYPE.RESET_ITEM_DATA:
			return initialItemState

		default:
			return state
	}
}
