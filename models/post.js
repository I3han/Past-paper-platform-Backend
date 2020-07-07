const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  un: { type:String, required: true},
  faculty: { type:String, required: true},
});

//creating a model
module.exports = mongoose.model('Post', postSchema);
