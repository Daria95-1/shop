/** @format */

const express = require('express')
const {
    getItem,
    getItems,
    addItem,
    editItem,
    deleteItem,
} = require('../controllers/item')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/hasRole')
const ROLES = require('../constants/roles')
const mapItem = require('../helpers/map-item')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
    const {
        search = '',
        limit = 10,
        page = 1,
        categoryId = null,
        priceSort = null,
    } = req.query

    const { items, lastPage } = await getItems(
        search,
        parseInt(limit),
        parseInt(page),
        categoryId ? parseInt(categoryId) : null,
        priceSort
    )

    res.send({ data: { lastPage, items: items.map(mapItem) } })
})

router.get('/:id', async (req, res) => {
    const item = await getItem(req.params.id)

    res.send({ data: mapItem(item) })
})

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const newItem = await addItem({
        title: req.body.title,
        brand: req.body.brand,
        price: req.body.price,
        count: req.body.count,
        image: req.body.imageUrl,
        content: req.body.content,
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
    })

    res.send({ data: mapItem(newItem) })
})

router.patch(
    '/:id',
    authenticated,
    hasRole([ROLES.ADMIN]),
    async (req, res) => {
        const updatedItem = await editItem(req.params.id, {
            title: req.body.title,
            brand: req.body.brand,
            price: req.body.price,
            count: req.body.count,
            image: req.body.imageUrl,
            content: req.body.content,
            categoryId: req.body.categoryId,
            categoryName: req.body.categoryName,
        })

        res.send({ data: mapItem(updatedItem) })
    }
)

router.delete(
    '/:id',
    authenticated,
    hasRole([ROLES.ADMIN]),
    async (req, res) => {
        await deleteItem(req.params.id)

        res.send({ error: null })
    }
)

module.exports = router
