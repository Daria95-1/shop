/** @format */

const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./auth'))
router.use('/items', require('./items'))
router.use('/users', require('./users'))
router.use('/comments', require('./comments'))
router.use('/categories', require('./categories'))

module.exports = router
