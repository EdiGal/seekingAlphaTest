const express = require("express");
const router = express.Router();

const path = require("path");
const publicPath = path.join(__dirname,"../", 'public')
const loginPagePath = path.join(publicPath, "html", "login", "login.html")

const usersData = require("../data/users")

router.get("/", (req, res) => {
    res.sendFile(loginPagePath)
})

router.post("/", async(req, res) => {
    const {name, password} = req.body
    try {
        const exists = await usersData.checkUserExist(name, password)
        console.log("exists")
        console.log(exists)
        console.log("----")
        if(exists){
            res.cookie('ok', true);
            res.redirect('/')
        }
        else {
            res.sendStatus(401)
        }
    }catch(err){
        console.log("--> ERROR!!!")
        res.send(err)
    }
})

module.exports = router;