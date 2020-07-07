const express = require("express");
const multer = require("multer");

const Pastpaper = require("../models/pastpaper");

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/pastpapers");
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
    const url = req.protocol + "://" + req.get("host");
    const pastpaper = new Pastpaper({
      title: req.body.title,
      year: req.body.year,
      ppPath: url + "/pastpapers/" + req.file.filename
    });
   // pastpaper.save().then(createdPost => {
      res.status(201).json({
        message: "Paper added successfully",
        // pastpaper: {
        //   ...createdPost,
        //   id: createdPost._id
        // }
      });
   //});

  console.log(req.body);
  // const pastpaper = new Pastpaper(req.body);
  // console.log(pastpaper);
  // pastpaper.save();
  // posts.push(post);

  // res.status(201).json({
  //   message: 'Past paper added successfully'
  // });
});

router.get("", (req,res,next)=>{

  Pastpaper.find().then(documents => {
    //console.log(documents);
    res.status(200).json({
      message:'server working!',
      papers: documents
    });
  });

});

router.delete("/:id", (req, res, next) => {
  Pastpaper.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
