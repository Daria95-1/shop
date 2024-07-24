import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import {
	usersReducer,
	userReducer,
	itemsReducer,
	itemReducer,
	themeReducer,
	appReducer,
	searchReducer,
	categoriesReducer
} from './reducers'
import cartReducer from './reducers/cart-reducer'

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	item: itemReducer,
	items: itemsReducer,
	theme: themeReducer,
	search: searchReducer,
	categories: categoriesReducer,
	cart: cartReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk))
)
