import { useDispatch, useSelector } from 'react-redux'
import { Button, ColorLink, Icon, Search } from '../../components'
import {
	selectCategories,
	selectIdCategory,
	selectItems,
	selectSearchPhrase,
	selectShouldSearch,
	selectTheme
} from '../../selectors'
import { useEffect, useState } from 'react'
import { setCategoryId } from '../../actions/set-category-id'
import { setCategories, setItemsData } from '../../actions'
import { Snipet, Category } from './components'
import { truncateContent } from '../utils/truncate-content'
import { EmptyList } from '../main/components'
import { request } from '../../utils'

export const Categories = () => {
	const isDarkMode = useSelector(selectTheme)
	const dispatch = useDispatch()
	const items = useSelector(selectItems)

	const categories = useSelector(selectCategories)
	const selectedCategoryId = useSelector(selectIdCategory)

	const searchPhrase = useSelector(selectSearchPhrase)
	const shouldSearch = useSelector(selectShouldSearch)
	const [priceSorting, setPriceSorting] = useState(null)

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		Promise.all([
			request(`/categories`),
			request(
				`/items?categoryId=${selectedCategoryId}&search=${searchPhrase}&priceSort=${priceSorting}`
			)
		]).then(([categories, items]) => {
			dispatch(setCategories(categories.data))
			dispatch(setItemsData(items.data.items))
			setIsLoading(false)
		})
	}, [dispatch, searchPhrase, selectedCategoryId, priceSorting, shouldSearch])

	const onSorting = () => {
		setPriceSorting((prev) => {
			const newSorting = prev === 'asc' ? 'desc' : 'asc'
			return newSorting
		})
	}

	const onReset = () => {
		setPriceSorting(null)
	}

	const onCategoryChange = (categoryId) => {
		dispatch(setCategoryId(categoryId))
	}

	if (isLoading) {
		return <div className='loader'></div>
	}

	return (
		<div className='flex flex-col justify-between mx-auto mobile:w-[570px] tablet:w-[640px] laptop:w-[1024px] minDesktop:w-[1280px] desktop:w-[1536px] pl-6 pr-6'>
			{/* breadcrumbs */}
			<div className='flex text-sm mb-6'>
				<i
					className={`bi bi-arrow-left text-base ${isDarkMode ? 'title-orange' : 'blue'}`}
				/>
				<ColorLink page='Главная /' route='/' />
				<div className='ml-2'>Категории</div>
			</div>
			<div>
				{/* кнопки */}
				<div className='flex gap-2'>
					<Button
						className='flex items-center h-12 border rounded gap-2'
						onClick={onSorting}
					>
						<Icon
							className={`bi-sort-${priceSorting === 'asc' ? 'down' : 'up'}`}
						/>
						<p>По цене</p>
					</Button>

					<Button
						className='button-cancel h-12 rounded'
						disabled={!priceSorting}
						onClick={onReset}
					>
						<p>Сбросить</p>
					</Button>
					<div className='flex-1 w-full md:w-auto'>
						<Search
							className='search w-full h-12 pl-10 border-1 rounded-full'
							text='Я ищу...'
							searchPhrase={searchPhrase}
						/>
					</div>
				</div>
				<div className='flex flex-col tablet:flex-row justify-center gap-3 mt-10'>
					<div className='panel-blue text-white w-full tablet:w-[300px] h-full flex flex-col text-base rounded p-4'>
						{categories && categories.length > 0 && (
							<Category
								selectedCategoryId={selectedCategoryId}
								onCategoryChange={onCategoryChange}
							/>
						)}
					</div>
					{/* товары */}
					<div className='flex w-full'>
						{items.length > 0 ? (
							<div className='flex flex-col justify-start w-full gap-2'>
								{items.map(
									({
										id,
										imageUrl,
										title,
										price,
										content,
										categoryName
									}) => (
										<Snipet
											key={id}
											id={id}
											imageUrl={imageUrl}
											title={title}
											price={Number(price)}
											content={truncateContent(content)}
											categoryName={categoryName}
										/>
									)
								)}
							</div>
						) : (
							<EmptyList />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
