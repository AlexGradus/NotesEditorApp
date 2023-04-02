const  {Schema, model} = require("mongoose");

const Note = new Schema({
    noteName: {type: String},
    noteText: {type: String },
    noteTags: {type: Array },
   
})


 module.exports = model('Note', Note);