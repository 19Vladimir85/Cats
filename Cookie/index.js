const app = require("express")();

app.get("/", (req, res) => {
    res.setHeader("set-cookie", "cookiefromserver=1")
    res.sendFile(`${__dirname}/index.html`)
})

app.get("/users", (req, res) => {
    res.send(`Users`)
})

app.get("/organizations", (req, res) => {
    res.send(`Organizations`)
})

app.listen(8080, () => console.log("listen on port 8080"))