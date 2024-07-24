import PropTypes from 'prop-types'
import { Button } from '../../../../components'

export const Pagination = ({ page, setPage, lastPage }) => {
	const isFirstPage = page === 1
	const isLastPage = page === lastPage

	return (
		<div className='flex laptop:flex-row items-center justify-center gap-2 mt-2'>
			<Button
				className='button'
				disabled={isFirstPage}
				onClick={() => setPage(1)}
			>
				<div className='flex gap-2'>
					<p>‹‹</p>
					<p className='hidden laptop:block'>В начало</p>
				</div>
			</Button>
			<Button
				className='button'
				disabled={isFirstPage}
				onClick={() => setPage(page - 1)}
			>
				<div className='flex gap-2'>
					<p>‹</p>
					<p className='hidden laptop:block'>Назад</p>
				</div>
			</Button>
			<div className='flex items-center justify-center h-10 text-base border rounded-3xl px-6'>
				<div className='flex gap-2'>
					<p className='hidden laptop:block'>Страница:</p>
					<p>{page}</p>
				</div>
			</div>
			<Button
				className='button'
				disabled={isLastPage}
				onClick={() => setPage(page + 1)}
			>
				<div className='flex gap-2'>
					<p className='hidden laptop:block'>Вперед</p>
					<p>›</p>
				</div>
			</Button>
			<Button
				className='button'
				disabled={isLastPage}
				onClick={() => setPage(lastPage)}
			>
				<div className='flex gap-2'>
					<p className='hidden laptop:block'>В конец</p>
					<p>››</p>
				</div>
			</Button>
		</div>
	)
}

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired
}
