const { formatDate } = require('./date-formatter')

module.exports = function (comment) {
    return {
        id: comment._id,
        content: comment.content,
        author: comment.author.login,
        publishedAt: formatDate(new Date(comment.createdAt)),
    }
}

