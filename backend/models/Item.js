const mongoose = require('mongoose')
const validator = require('validator')

const ItemSchema = mongoose.Schema(
    {
        image: {
            type: String,
            require: true,
            validate: {
                validator: validator.isURL,
                message: 'Image should be a valid url',
            },
        },
        title: {
            type: String,
            require: true,
        },
        brand: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        count: {
            type: Number,
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        categoryId: {
            type: Number,
            require: true,
        },
        categoryName: {
            type: String,
            require: true,
        },
        categoryId: {
            type: Number,
            required: true,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    { timestamps: true }
)

const Item = mongoose.model('Item', ItemSchema)

module.exports = Item