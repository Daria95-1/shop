import { ACTION_TYPE } from '../actions'

const initialState = {
	shouldSearch: false,
	searchPhrase: ''
}

export const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_SHOULD_SEARCH:
			return {
				...state,
				shouldSearch: !state.shouldSearch
			}

		case ACTION_TYPE.SET_SEARCH_PHRASE:
			return {
				...state,
				searchPhrase: action.payload
			}
		default:
			return state
	}
}
