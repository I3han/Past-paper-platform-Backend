const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");
const pastpapersRoutes = require("./routes/pastpapers");

const year1ppsRoutes = require("./routes/year1pps");
const year2ppsRoutes = require("./routes/year2pps");
const year3ppsRoutes = require("./routes/year3pps");
const year4ppsRoutes = require("./routes/year4pps");

const Post = require("./models/post");

const app = express();

mongoose.connect("mongodb+srv://I3han:ishanahahah@cluster0-uimdj.mongodb.net/paper-db?retryWrites=true&w=majority")
	.then(() => {	 //promise
		console.log('mongodb connected');
	})
	 .catch(() => {	 //handle errors if it have any(connection falire)
		console.log('connection failer');
	});

// let posts= [
//   {id:'awdawdawd',un:'kasun',faculty:'IT'},
//   {id:'aefgsaefk',un:'tharindu',faculty:'Eng'},
//   {id:'awdfgsaefk',un:'sithum',faculty:'Eng'},
// ];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/pastpapers", express.static(path.join("backend/pastpapers")));
app.use("/year1pps", express.static(path.join("backend/year1pps")));
app.use("/year2pps", express.static(path.join("backend/year1pps")));
app.use("/year3pps", express.static(path.join("backend/year1pps")));
app.use("/year4pps", express.static(path.join("backend/year1pps")));
//app.use("/images", express.static(path.join("backend/pastpapers")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.post("/api/posts" ,(req,res,next) =>{
  // const post = { id:"adwwadwad" , ...req.body};
  // console.log(post);


  const post = new Post(req.body);
  console.log(post);
  post.save();
  // posts.push(post);

  res.status(201).json({
    message: 'post added successfully'
  });
});

app.get("/api/posts", (req,res,next)=>{

  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message:'server working!',
      posts: documents
    });
  });

})
app.use("/api/posts", postsRoutes);
app.use("/api/pastpapers", pastpapersRoutes);
app.use("/api/year1pps", year1ppsRoutes);
app.use("/api/year2pps", year2ppsRoutes);
app.use("/api/year3pps", year3ppsRoutes);
app.use("/api/year4pps", year4ppsRoutes);

module.exports = app;
