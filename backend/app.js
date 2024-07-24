/** @format */

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { formatDate } = require('./helpers/date-formatter')
const mapUser = require('./helpers/map-user')
const {
    register,
    login,
    getUsers,
    getRoles,
    updateUser,
    deleteUser,
} = require('./controllers/user')
const {
    getItem,
    getItems,
    addItem,
    editItem,
    deleteItem,
} = require('./controllers/item')
const authenticated = require('./middlewares/authenticated')
const hasRole = require('./middlewares/hasRole')
const ROLES = require('./constants/roles')
const mapItem = require('./helpers/map-item')
const { addComment, deleteComment } = require('./controllers/comment')
const mapComment = require('./helpers/map-comment')
const { getCategories, getCategory } = require('./controllers/category')

const port = 3001
const app = express()

app.use(express.static('../frontend/build'))

app.use(cookieParser())
app.use(express.json())

app.post('/register', async (req, res) => {
    try {
        const { user, token } = await register(
            req.body.login,
            req.body.password
        )

        const formattedUser = {
            ...user.toObject(),
            registeredAt: formatDate(new Date(user.registeredAt)),
            updatedAt: formatDate(new Date(user.updatedAt)),
        }

        res.cookie('token', token, { httpOnly: true }).send({
            error: null,
            user: mapUser(formattedUser),
        })
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { user, token } = await login(req.body.login, req.body.password)

        res.cookie('token', token, { httpOnly: true }).send({
            error: null,
            user: mapUser(user),
        })
    } catch (e) {
        res.send({ error: e.message || 'Unknown error' })
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '', { httpOnly: true }).send({})
})

app.get('/items', async (req, res) => {
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

app.get('/items/:id', async (req, res) => {
    const item = await getItem(req.params.id)

    res.send({ data: mapItem(item) })
})

app.get('/categories', async (req, res) => {
    const categories = await getCategories(
        req.query.name,
        req.query.id,
        req.query.priceSort
    )

    res.send({ data: categories })
})

app.get('/categories/:id', async (req, res) => {
    const category = await getCategory(req.params.id)

    res.send({ data: category })
})

app.use(authenticated)

app.post('/items/:id/comments', async (req, res) => {
    const newComment = await addComment(req.params.id, {
        content: req.body.content,
        author: req.user.id,
    })

    res.send({ data: mapComment(newComment) })
})

app.delete(
    '/items/:itemId/comments/:commentId',
    hasRole([ROLES.ADMIN]),
    async (req, res) => {
        await deleteComment(req.params.itemId, req.params.commentId)

        res.send({ error: null })
    }
)

app.post('/items', hasRole([ROLES.ADMIN]), async (req, res) => {
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

app.patch('/items/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
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
})

app.delete('/items/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteItem(req.params.id)

    res.send({ error: null })
})

app.get('/users', hasRole([ROLES.ADMIN]), async (req, res) => {
    const users = await getUsers()

    res.send({ data: users.map(mapUser) })
})

app.get('/users/roles', hasRole([ROLES.ADMIN]), async (req, res) => {
    const roles = getRoles()

    res.send({ data: roles })
})

app.patch('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    const newUser = await updateUser(req.params.id, {
        role: req.body.roleId,
    })

    res.send({ data: mapUser(newUser) })
})

app.delete('/users/:id', hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteUser(req.params.id)

    res.send({ error: null })
})

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`)
    })
})
