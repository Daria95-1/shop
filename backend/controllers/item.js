const Item = require('../models/Item')

async function addItem(item) {
    const newItem = await Item.create(item)
        
    newItem.populate({
        path: 'comments',
        populate: 'author',
    })

    return newItem
}

async function editItem(id, item) {
    const newItem = await Item.findByIdAndUpdate(id, item, { returnDocument: 'after' })

    await newItem.populate({
        path: 'comments',
        populate: 'author',
    })

    return newItem
}

function deleteItem(id) {
    return Item.deleteOne({ _id: id})
}

async function getItems(
    search = '',
    limit = 10,
    page = 1,
    categoryId = null,
    priceSort = null
) {
    const query = {
        title: { $regex: search, $options: 'i' },
    }

    if (categoryId) {
        query.categoryId = categoryId
    }

    const sortOption = {}
    if (priceSort) {
        sortOption.price = priceSort === 'asc' ? 1 : -1
    } else {
        sortOption.createdAt = -1
    }

    const [items, count] = await Promise.all([
        Item.find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(sortOption),
        Item.countDocuments(query),
    ])

    return {
        items,
        lastPage: Math.ceil(count / limit),
    }
}

function getItem(id) {
    return Item.findById(id).populate({
        path: 'comments',
        populate: 'author'
    })
}

async function getItemsByCategory(categoryId) {
    if (!categoryId) {
        return await Item.find()
    }
    return await Item.find({ categoryId })
}

module.exports = {
    addItem,
    editItem,
    deleteItem,
    getItems,
    getItem,
    getItemsByCategory
}