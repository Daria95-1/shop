/** @format */

const express = require('express')

const { getCategories, getCategory } = require('../controllers/category')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
    const categories = await getCategories(
        req.query.name,
        req.query.id,
        req.query.priceSort
    )

    res.send({ data: categories })
})

router.get('/:id', async (req, res) => {
    const category = await getCategory(req.params.id)

    res.send({ data: category })
})

module.exports = router
