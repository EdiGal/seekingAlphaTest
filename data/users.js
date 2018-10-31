const connection = require("./config").getConnection()

module.exports.getAllUsers = async() => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT users.ID as userID, users.name AS username, group_names.name as groupname,(select count(*) from followers where to_userID=Users.ID) AS followers
                          FROM users
                          INNER JOIN group_names ON users.group_id=group_names.ID
                          where users.id != "${global.user.ID}"
                          ;`, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    })
}

module.exports.getFollowing = async () => {
    return new Promise((resolve, reject) => {
        connection.query(`select to_userID
                          from followers
                          where followers.from_userID="${global.user.ID}";`, function (error, results, fields) {
            if (error) reject(error);
            resolve(results);
        });
    })
}

module.exports.checkUserExist = async(username, password) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users where name="${username}" and password="${password}"`, function (error, results, fields) {
            if (error || results.length != 1) {
                reject(error);
                console.log("Reject on checkUserExist:")
                console.log(error)
            }

            global.user = results[0]
            resolve(true);
        });
    })
}

module.exports.stopFollow = async userID => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM followers where from_userID="${global.user.ID}" and to_userID="${userID}"`, function (error, results, fields) {
            if (error) {
                reject(error);
                console.log("Reject on startFollow:")
                console.log(error)
            }
            const result = results.affectedRows == 1
            resolve(result);
        });
    })
}

module.exports.startFollow = async userID => {
    return new Promise((resolve, reject) => {
        connection.query(`insert into followers(from_userID, to_userID) values(${global.user.ID}, ${userID});`, function (error, results, fields) {
            if (error) {
                reject(error);
                console.log("Reject on startFollow:")
                console.log(error)
            }
            const result = results.affectedRows == 1
            resolve(result);
        });
    })
}