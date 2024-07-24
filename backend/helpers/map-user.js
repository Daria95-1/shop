const { formatDate } = require('./date-formatter')

module.exports = function (user) {
    return {
        id: user._id,
        login: user.login,
        roleId: user.role,
        registeredAt: formatDate(new Date(user.createdAt)),
    }
}