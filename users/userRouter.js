const express = require('express');
const { orWhereNotExists } = require('../data/dbConfig');
const {validateUserID, validateUser, validatePost,} = require("../middleware/validate")
const db = require("./userDb");
const dbPost = require("../posts/postDb");


const router = express.Router();

router.post('/', validateUser(), (req, res) => {
   db.insert(req.body)
    .then((user)=> {
      res.status(201).json(user)
    })
    .catch((err)=> {
      console.log(err)
      return res.status(500).json({
        message: "error getting data"
      })
    })
});

router.post('/:id/posts', validateUserID(), validatePost(), (req, res) => {
   
   id = req.params.id
   const post = {...req.body, user_id: id}
   console.log("id:", id)

   dbPost.insert(post)
      .then((post)=> {
        res.status(201).json(post)
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({
          message: "error getting data"
        })
      })
});

router.get('/', (req, res, next) => {
  db.get()
    .then((user)=> res.status(200).json(user))
    .catch((err)=> {
      res.status(500).json({
        message: "something's wrong in the back"
      })
    })
});

router.get('/:id', validateUserID(), (req, res) => {
  res.status(200).json(req.user)
  
});

router.get('/:id/posts', validateUserID(), (req, res) => {
  db.getUserPosts(req.params.id)
    .then((posts)=> {
      res.status(200).json(posts)
    })
});

router.delete('/:id', validateUserID(), (req, res) => {
    db.remove(req.user)
      .then(()=> {
        res.status(200).json({
          message: "My God, you've killed a LOTR character"
        })
      })
});

router.put('/:id', validateUserID(), validateUser(), (req, res) => {
  const name = req.body
  db.update(req.params.id, name)
    .then((update)=> {
      if(update) {
        res.status(200).json(update)
      }
      else {
        res.status(404).json({
          message: "This user could not be found"
        })
      }
   })  
   .catch(()=> {
     res.status(500).json({
       message: "Backend is messed up"
     })
   })
 
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
