const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type:String, required: true},
  year: { type:String, required: true},
  ppPath: { type: String, required: true }
});

//creating a model
module.exports = mongoose.model('year4pp', postSchema);
