const express = require("express");
const multer = require("multer");

const Year2pp = require("../models/year2pp");

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/year2pps");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, name + "-" + Date.now() + "." + "pdf");
  }
});


router.post(
  "",
  multer({ storage: storage }).single("pastpaper"),
  (req, res, next) => {
    console.log(req.body);
    const url = req.protocol + "://" + req.get("host");
    const year2pp = new Year2pp({
      title: req.body.title,
      year: req.body.year,
      ppPath: url + "/year2pps/" + req.file.filename
    });
    year2pp.save().then(createdPost => {
      res.status(201).json({
        message: "Paper added successfully",
        // pastpaper: {
        //   ...createdPost,
        //   id: createdPost._id
        // }
      });
    });


  // const pastpaper = new Pastpaper(req.body);
  // console.log(pastpaper);
  // pastpaper.save();
  // posts.push(post);

  // res.status(201).json({
  //   message: 'Past paper added successfully'
  // });
});

router.get("", (req,res,next)=>{

  Year2pp.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message:'server working!',
      papers: documents
    });
  });

});

router.delete("/:id", (req, res, next) => {
  Year2pp.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
