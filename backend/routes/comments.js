/** @format */

const express = require('express')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/hasRole')
const ROLES = require('../constants/roles')
const { addComment, deleteComment } = require('../controllers/comment')
const mapComment = require('../helpers/map-comment')

const router = express.Router({ mergeParams: true })

router.post('/items/:id/comments', authenticated, async (req, res) => {
    const newComment = await addComment(req.params.id, {
        content: req.body.content,
        author: req.user.id,
    })

    res.send({ data: mapComment(newComment) })
})

router.delete(
    '/items/:itemId/comments/:commentId',
    authenticated,
    hasRole([ROLES.ADMIN]),
    async (req, res) => {
        await deleteComment(req.params.itemId, req.params.commentId)

        res.send({ error: null })
    }
)

module.exports = router
