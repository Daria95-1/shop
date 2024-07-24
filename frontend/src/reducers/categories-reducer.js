import { ACTION_TYPE } from '../actions'

const initialState = {
	categories: [],
	selectedCategoryId: null
}

export const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return {
				...state,
				categories: action.payload
			}

		case ACTION_TYPE.SET_CATEGORY_ID:
			return {
				...state,
				selectedCategoryId: action.payload
			}

		default:
			return state
	}
}
