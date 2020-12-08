const express = require('express');
const { orWhereNotExists } = require('../data/dbConfig');
const {validateUserID, validateUser, validatePost,} = require("../middleware/validate")
const db = require("./userDb")


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

router.post('/:id/posts', (req, res) => {
  // do your magic!
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

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserID(), (req, res) => {
    db.remove(req.user)
      .then(()=> {
        res.status(200).json({
          message: "My God, you've killed a LOTR character"
        })
      })
});

router.put('/:id', validateUser(), (req, res) => {
  const name = req.body.name
  const id = req.params.id
  db.update(id, name )
  res.status(200).json( name, {
    message: "Yay! You made a change",
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
