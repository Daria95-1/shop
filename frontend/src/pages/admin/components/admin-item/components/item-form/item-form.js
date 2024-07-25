import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCategories, selectTheme } from '../../../../../../selectors'
import { Link, useNavigate } from 'react-router-dom'
import { sanitizeContent } from './utils'
import { saveItemAsync, setCategories } from '../../../../../../actions'
import { Button, Icon, Input } from '../../../../../../components'
import { SelectedCategory } from './components'
import { PROP_TYPE } from '../../../../../../constants'
import { request } from '../../../../../../utils'

export const ItemForm = ({
	item: {
		id,
		title,
		brand,
		price,
		count,
		imageUrl,
		content,
		categoryId,
		categoryName
	}
}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isDarkMode = useSelector(selectTheme)
	const [isLoading, setIsLoading] = useState(true)
	const categories = useSelector(selectCategories)

	const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId)
	const [selectedCategoryName, setSelectedCategoryName] =
		useState(categoryName)
	const [titleValue, setTitleValue] = useState(title)
	const [brandValue, setBrandValue] = useState(brand)
	const [priceValue, setPriceValue] = useState(price)
	const [countValue, setCountValue] = useState(count)
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl)

	useLayoutEffect(() => {
		setTitleValue(title)
		setBrandValue(brand)
		setPriceValue(price)
		setCountValue(count)
		setImageUrlValue(imageUrl)
		setSelectedCategoryId(categoryId)
		setSelectedCategoryName(categoryName)
	}, [
		title,
		brand,
		price,
		count,
		imageUrl,
		categoryId,
		categoryName,
		dispatch
	])

	const contentRef = useRef(null)

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML)

		dispatch(
			saveItemAsync(id, {
				title: titleValue,
				brand: brandValue,
				price: priceValue,
				count: countValue,
				imageUrl: imageUrlValue,
				content: newContent,
				categoryId: selectedCategoryId,
				categoryName: selectedCategoryName
			})
		).then(() => navigate('/admin/item'))
	}

	const onTitleChange = ({ target }) => setTitleValue(target.value)
	const onBrandChange = ({ target }) => setBrandValue(target.value)
	const onPriceChange = ({ target }) => setPriceValue(target.value)
	const onCountChange = ({ target }) => setCountValue(target.value)
	const onImageChange = ({ target }) => setImageUrlValue(target.value)

	useEffect(() => {
		request(`/categories`).then(({ data }) => {
			dispatch(setCategories(data))
			setIsLoading(false)
		})
	}, [dispatch])

	const onCategoryChange = ({ target }) => {
		const selectedCategoryId = target.value
		const selectedCategoryName =
			categories.find(
				(category) => category.id === parseInt(selectedCategoryId)
			)?.name || ''
		setSelectedCategoryId(selectedCategoryId)
		setSelectedCategoryName(selectedCategoryName)
	}

	if (isLoading) {
		return <div className='admin-loader'></div>
	}

	return (
		<div className='flex flex-col gap-3 max-w-[910px] mobile:w-[570px] tablet:w-[640px] laptop:w-[1024px] minDesktop:w-[1280px] desktop:w-[1536px]'>
			<div className='flex justify-between'>
				{/* main info */}
				<div className='flex text-2xl gap-2'>
					<Link to='/admin/item'>
						<Icon
							className='dark:title-orange cursor-pointer'
							icon='bi-arrow-left'
						/>
					</Link>

					<h3>Карточка товара</h3>
				</div>
			</div>
			{/* inputs */}
			<Input
				type='text'
				value={titleValue}
				onChange={onTitleChange}
				placeholder='Введите название товара'
			/>
			<Input
				type='text'
				onChange={onBrandChange}
				defaultValue={brandValue}
				placeholder='Введите название бренда'
			/>
			{categories && (
				<SelectedCategory
					className='w-full'
					selectedCategoryId={selectedCategoryId}
					onCategoryChange={onCategoryChange}
				/>
			)}

			<Input
				type='number'
				onChange={onPriceChange}
				defaultValue={priceValue}
				placeholder='Укажите стоимость товара'
			/>
			<Input
				type='number'
				onChange={onCountChange}
				defaultValue={countValue}
				placeholder='Укажите количество товара'
			/>
			<Input
				type='url'
				onChange={onImageChange}
				value={imageUrlValue}
				placeholder='Укажите ссылку на фото'
			/>
			{/* text fields */}
			<div
				className={`textarea-field ${isDarkMode ? 'dark:bg-slate-700' : 'bg-white'} border-solid border-1 rounded w-full h-[120px] resize-none pt-3 pl-4 overflow-y-auto`}
				suppressContentEditableWarning={true}
				contentEditable={true}
				ref={contentRef}
				placeholder='Опишите товар...'
			>
				{content}
			</div>
			{/* buttons */}
			<div className='flex justify-between'>
				<Button className='button-cancel' onClick={() => navigate(-1)}>
					Отмена
				</Button>
				<Button className='button' onClick={onSave}>
					Сохранить
				</Button>
			</div>
		</div>
	)
}

ItemForm.propTypes = {
	item: PROP_TYPE.ITEM.isRequired
}
