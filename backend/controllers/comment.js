const Comment = require('../models/Comment')
const Item = require('../models/Item')

async function addComment(itemId, comment) {
    const newComment = await Comment.create(comment)

    await Item.findByIdAndUpdate(itemId, { $push: { comments: newComment } })

    await newComment.populate('author')

    return newComment
}

async function deleteComment(itemId, commentId) {
    await Comment.deleteOne({ _id: commentId })
    
    await Item.findByIdAndUpdate(itemId, { $pull: { comments: commentId } })

}

module.exports = {
    addComment,
    deleteComment
}