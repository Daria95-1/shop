const mongoose = require('mongoose')
const mapComment = require('./map-comment')
const { formatDate } = require('./date-formatter')

module.exports = function (item) {
    return {
        id: item.id,
        title: item.title,
        brand: item.brand,
        price: item.price,
        count: item.count,
        imageUrl: item.image,
        content: item.content,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        publishedAt: formatDate(new Date(item.createdAt)),
        comments: item.comments.map(comment => mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment))
    }
}

