const userDb = require("../users/userDb")
const postDb = require("../posts/postDb")

function validateUserID(){
    return (req, res, next) => {
        userDb.getbyId(req.params.id)
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

module.exports = {
    validateUserID,
    validateUser,
    validatePost
}