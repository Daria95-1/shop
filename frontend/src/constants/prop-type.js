import PropTypes from 'prop-types'
import { ROLE } from './role'

const ROLE_ID = PropTypes.oneOf(Object.values(ROLE))

export const PROP_TYPE = {
	ROLE_ID,
	ROLE: PropTypes.shape({
		id: ROLE_ID,
		name: PropTypes.string.isRequired
	}),
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
	COMMENT: PropTypes.shape({
		id: PropTypes.number.isRequired,
		author: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired
	}),
	ITEM: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		brand: PropTypes.string.isRequired,
		price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
			.isRequired,
		count: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
			.isRequired,
		imageUrl: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		categoryName: PropTypes.string.isRequired,
		commentsCount: PropTypes.number
	})
}
