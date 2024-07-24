import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ColumnName, Search } from '../../../../../../components'
import { ItemRow } from '../item-row/item-row'
import {
	CLOSE_MODAL,
	openModal,
	removeItemAsync,
	setItemsData
} from '../../../../../../actions'
import { useDispatch, useSelector } from 'react-redux'
import { truncateTitle } from '../../../../../utils/truncate-title'
import {
	selectItems,
	selectSearchPhrase,
	selectShouldSearch
} from '../../../../../../selectors'
import { TableHeader } from './components'
import { request } from '../../../../../../utils'

export const Content = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState(true)
	const items = useSelector(selectItems) || []
	const searchPhrase = useSelector(selectSearchPhrase)
	const shouldSearch = useSelector(selectShouldSearch)
	const [shouldUpdateItemsList, setShouldUpdateItemsList] = useState(false)

	useEffect(() => {
		request(`/items?search=${searchPhrase}`).then(({ data: { items } }) => {
			dispatch(setItemsData(items))
			setIsLoading(false)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, searchPhrase, shouldSearch, shouldUpdateItemsList])

	const onItemRemove = (id) => {
		dispatch(
			openModal({
				text: 'Вы действительно хотите удалить этот товар?',
				onConfirm: () => {
					dispatch(removeItemAsync(id)).then(() => {
						setShouldUpdateItemsList(!shouldUpdateItemsList)
					})
					dispatch(CLOSE_MODAL)
				},
				onCancel: () => dispatch(CLOSE_MODAL)
			})
		)
	}

	if (isLoading) {
		return <div className='loader'></div>
	}

	return (
		<div className='max-w-[910px] flex-wrap'>
			<div>
				<h2 className='text-2xl font-bold mb-4'>Карточки товаров</h2>
				<p>
					Созданные карточки товаров можно увидеть в таблице ниже.
					Здесь можно добавить, отредактировать или удалить товар.
				</p>
			</div>

			<div className='flex gap-3 mt-4 mb-4'>
				<div className='flex-1'>
					<Search
						className='search w-full h-10 pl-10 border-1 rounded-3xl'
						text='Поиск по товарам'
						searchPhrase={searchPhrase}
					/>
				</div>
				<Button
					className='button'
					onClick={() => navigate('/admin/create')}
				>
					Добавить товар
				</Button>
			</div>

			<div className='max-h-80 overflow-y-auto'>
				{items.length === 0 ? (
					<p className='flex justify-center font-semibold'>
						Карточки отсутствуют
					</p>
				) : (
					<div>
						<TableHeader className='row flex items-center'>
							<ColumnName name='title'>Название</ColumnName>
							<ColumnName name='category'>Категория</ColumnName>
							<ColumnName name='price'>Цена, ₽</ColumnName>
							<ColumnName name='acttion'>Действие</ColumnName>
						</TableHeader>

						<div className='table-fixed w-full'>
							{items.map(({ id, title, price, categoryName }) => (
								<ItemRow
									key={id}
									title={truncateTitle(title)}
									price={price}
									categoryName={truncateTitle(categoryName)}
									onItemEdit={() =>
										navigate(`/admin/item/${id}/edit`)
									}
									onItemRemove={() => onItemRemove(id)}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
