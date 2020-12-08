const userDb = require("../users/userDb")
const postDb = require("../posts/postDb")

function validateUserID(){
    return (req, res, next) => {
        userDb.getById(req.params.id)
            .then((user)=> {
                if(user) {
                    req.user = user
                    next()
                }
                else {
                    res.status(404).json({
                        message: "User does not exist"
                    })
                }
               
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: "Error retrieving data"
                })
            })
    
    }
};

function validateUser(){
    return (req, res, next) => {
        if(!req.body.name) {
            return res.status(400).json({
                message: "missing required name"
            })
        }
        else {
            next()
        }
    }
};

function validatePost(){
    return (req, res, next) => {
        if(!req.body.text){
            return res.status(400).json({
                message: "missing text"
            })
        }
        else {
            next()
        }
    }
};

function validatePostID(){
    return (req, res, next) => {
        postDb.getById(req.params.id)
            .then((post)=> {
                if(post) {
                    req.post = post
                    next()
                }
                else {
                    res.status(404).json({
                        message: "The post with this ID can't be found"
                    })
                }
            })
            .catch((err)=> {
                console.log(err)
                res.status(500).json({
                    message: "Error in the back"
                })
            })
    }
}

module.exports = {
    validateUserID,
    validateUser,
    validatePost,
    validatePostID
}