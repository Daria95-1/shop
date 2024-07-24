import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Comments, ItemContent } from './components'
import { useParams } from 'react-router-dom'
import { loadItemAsync } from '../../actions'
import { selectItem } from '../../selectors'
import { Error } from '../../components'

export const Item = () => {
	const [error, setError] = useState(true)
	const [isLoading, setIsLoading] = useState(true)

	const dispatch = useDispatch()
	const params = useParams()
	const item = useSelector(selectItem)

	useEffect(() => {
		dispatch(loadItemAsync(params.id)).then((itemData) => {
			setError(itemData.error)
			setIsLoading(false)
		})
	}, [dispatch, params.id])

	if (isLoading) {
		return <div className='loader'></div>
	}

	return error ? (
		<Error error={error} />
	) : (
		<div>
			<ItemContent item={item} />
			<Comments
				comments={item.comments}
				itemId={item.id}
				commentsCount={item.commentsCount}
			/>
		</div>
	)
}
