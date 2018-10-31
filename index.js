const express = require("express");
const app = express();
const path = require("path");
const config = require("./config")

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const cookieParser = require('cookie-parser')
app.use(cookieParser())


const publicPath = path.join(__dirname, 'public')

app.use(express.static('public'))

app.get("/", checkIfUserLoggedIn, async (req, res) => {
    res.sendFile(path.join(publicPath, "html", 'index.html'))
})

app.use("/login", require("./routes/login"));
app.use("/users", require("./routes/users"));
app.use("/follow", require("./routes/follow"));

function checkIfUserLoggedIn(req, res, next) {
    const ok = req.cookies.ok === "true";
    console.log("ok:"+ok)

    if (ok && global.user) {
        console.log('logged-in request')
        next()
    } else {
        console.log("redirected to /login")
        res.redirect('/login');
    }
}

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
    connection.end();
})

app.listen(config.PORT)