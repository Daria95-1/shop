import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	selectSearchPhrase,
	selectShouldSearch,
	selectTheme
} from '../../selectors'
import { Button, Search } from '../../components'
import { Banner, EmptyList, Offers, Pagination, Product } from './components'
import { truncateTitle } from '../utils/truncate-title'
import { PAGINATION_LIMIT } from '../../constants'
import { selectItems } from '../../selectors'
import { setItemsData } from '../../actions'
import { useNavigate } from 'react-router-dom'
import { request } from '../../utils'

export const Main = () => {
	const isDarkMode = useSelector(selectTheme)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const items = useSelector(selectItems)
	const searchPhrase = useSelector(selectSearchPhrase)
	const shouldSearch = useSelector(selectShouldSearch)

	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		request(
			`/items?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`
		).then(({ data: { items, lastPage } }) => {
			dispatch(setItemsData(items))
			setLastPage(lastPage)
			setIsLoading(false)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, searchPhrase, page, shouldSearch])

	if (isLoading) {
		return <div className='loader'></div>
	}

	return (
		<div
			className={`flex w-full justify-center mobile:w-[570px] tablet:w-[640px] laptop:w-[1024px] minDesktop:w-[1280px] desktop:w-[1536px] ${isDarkMode ? 'bg-slate-800' : ''}`}
		>
			<div className='w-full max-w-screen-2xl pl-6 pr-6'>
				<Banner />
				<Offers />
				{/* Товары, поиск */}
				<div>
					<div className='relative flex items-center w-full h-12 mt-10 gap-3'>
						<div className='flex items-center justify-center gap-2'>
							<Button
								className='button h-12 w-[200px] rounded'
								onClick={() => navigate('categories')}
							>
								Категории
							</Button>
						</div>
						<div className='flex-1 w-full md:w-auto'>
							<Search
								className='search w-full h-12 pl-10 border-1 rounded-full'
								text='Я ищу...'
								searchPhrase={searchPhrase}
							/>
						</div>
					</div>
					<div className='flex w-full justify-center'>
						{/* товары */}
						{items.length > 0 ? (
							<div className='flex flex-wrap justify-start gap-3 mt-10'>
								{items.map(
									({
										id,
										imageUrl,
										title,
										price,
										brand,
										count,
										categoryName,
										comments,
										onBuy
									}) => (
										<Product
											key={id}
											id={id}
											imageUrl={imageUrl}
											title={truncateTitle(title)}
											price={Number(price)}
											brand={brand}
											count={count}
											categoryName={categoryName}
											commentsCount={comments.length}
											onBuy={onBuy}
										/>
									)
								)}
							</div>
						) : (
							<EmptyList />
						)}
					</div>
				</div>
				{/* пагинация */}
				{lastPage > 1 && items.length > 0 && (
					<Pagination
						page={page}
						setPage={setPage}
						lastPage={lastPage}
					/>
				)}
			</div>
		</div>
	)
}
