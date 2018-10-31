const usersData = require("../data/users")

module.exports.getUsers = async () => {
    let users = await usersData.getAllUsers()
    let following = await usersData.getFollowing()
    users = users.map(user => {
        return {...user, follow:following.some(followedUser=>followedUser.to_userID==user.userID)}
    })
    return users
}