const express = require("express")
const morgan = require("morgan")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express()
const port = 4000

server.use(express.json())

server.use((req, res, next) => {
    //const time = now Date().toString();
    console.log(`${req.ip} ${req.method} ${req.url}`)
    next()
})

// this is error hanlding(next(err))
server.use((err, req, res, next)=> {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

server.use(`/api/users`, userRouter)
server.use(`/api/posts`, postRouter)

server.listen(port, ()=> {
    console.log(`Server running at http://localhost:${port}`)
})