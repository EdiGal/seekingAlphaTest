const express = require("express")
const router = express.Router();

const usersLogic = require("../logic/users")

router.get("/", async(req, res) => {
    let users = await usersLogic.getUsers()
    res.send(users)
})

module.exports = router;