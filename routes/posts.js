const express = require("express");
const multer = require("multer");

const Post = require("../models/post");

const router = express.Router();


router.post("" ,(req,res,next) =>{
  const post = new Post(req.body);
  console.log(post);
  post.save();
  // posts.push(post);

  res.status(201).json({
    message: 'post added successfully'
  });
});

router.get("", (req,res,next)=>{

  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message:'server working!',
      posts: documents
    });
  });

})

module.exports = router;

