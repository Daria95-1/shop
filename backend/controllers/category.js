const categories = require('../categories')

async function getCategories(
    categoryName = '',
    categoryId = null,
    priceSort = null
) {
    let filteredCategories = categories

    if (categoryName) {
        filteredCategories = filteredCategories.filter((category) =>
            category.name.includes(categoryName)
        )
    }

    if (categoryId !== null) {
        filteredCategories = filteredCategories.filter(
            (category) => category.id == categoryId
        )
    }

    if (priceSort) {
        filteredCategories.sort((a, b) => {
            if (priceSort === 'asc') {
                return a.price - b.price
            } else if (priceSort === 'desc') {
                return b.price - a.price
            }
            return 0
        })
    }
        
    return filteredCategories
}

async function getCategory(categoryId) {
    const category = categories.find((category) => category.id == categoryId)
    return category || null
}

module.exports = {
    getCategories,
    getCategory
};