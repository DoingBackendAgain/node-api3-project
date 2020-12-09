const express = require('express');
const {validatePost, validatePostID} = require("../middleware/validate")
const db = require("./postDb")

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then((posts)=> res.status(200).json(posts))
    .catch((err)=> {
      res.status(500).json({
        message: "something's wrong the back"
      })
    })
});

router.get('/:id', validatePostID(), (req, res) => {
  res.status(200).json(req.post)
});

router.delete('/:id', validatePostID(), (req, res) => {
   db.remove(req.post)
    .then(()=> {
      res.status(200).json({
        message: "How dare you!"
      })
    })
});

router.put('/:id', validatePostID(), validatePost(), (req, res) => {
  const post = req.body
  db.update(req.params.id, post)
    .then((update)=> {
      if(update){
        res.status(200).json(update)
      }
      else {
        res.status(404).json({
          message: "The post with this ID couldn't be found"
        })
      }
    })
    .catch(()=> {
      res.status(500).json({
        message: "Backend! What have you done?"
      })
    })
});

// custom middleware

// function validatePostId(req, res, next) {
//   // do your magic!
// }

module.exports = router;
