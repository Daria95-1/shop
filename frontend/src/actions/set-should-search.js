import { ACTION_TYPE } from './action-type'

export const setShouldSearch = (shouldSearch) => ({
	type: ACTION_TYPE.SET_SHOULD_SEARCH,
	payload: shouldSearch
})
