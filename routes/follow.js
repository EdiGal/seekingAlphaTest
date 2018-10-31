const express = require("express")
const router = express.Router()

const usersData = require("../data/users")

router.post("/:userID", async (req, res) => {
    let result = await usersData.startFollow(req.params.userID)
    console.log("result:")
    console.log(result)
    console.log("---")
    res.send(result)
})

router.delete("/:userID", async (req, res) => {
    let result = await usersData.stopFollow(req.params.userID)
    res.send(result)
})

module.exports = router