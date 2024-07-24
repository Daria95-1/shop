import { ACTION_TYPE } from '../actions'

const initialItemsState = {
	items: []
}

export const itemsReducer = (state = initialItemsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ITEMS_DATA:
			return {
				...state,
				items: action.payload
			}

		default:
			return state
	}
}
