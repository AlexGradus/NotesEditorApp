const Router = require("express");
const Note = require("../models/Note"); 
const config = require("config");
const router = new Router();
const mongoose = require("mongoose");

router.post('/createnote',async (req, res) =>{
    try {
        const { noteName,noteText,noteTags } = req.body;
        if(noteName.length==0||noteText.length==0){
            return res.status(404).json({message:`Name(Note) has to have at least one character!`})
        }
       const noteDouble = await Note.findOne({noteName});
       if(noteDouble){
        return res.status(400).json({message:`Note already exists!`})
       }
       const newNote = new Note({ noteName, noteText,noteTags });
        await newNote.save();
        return res.json({message:'Note is created'});

    } catch(e){
        console.log(e);
        res.send({ message: 'Server Error' })
    }
})
router.post('/editnote',async (req, res) =>{
    try {
        const { noteName,noteText,noteTags } = req.body;
        if(noteName.length==0||noteText.length==0){
            return res.status(404).json({message:`Name(Note) has to have at least one character!`})
        }
        const result = await Note.updateOne({noteName},{$set:{noteText,noteTags}});

        return res.json({
           result
       }) 

    } catch(e){
        console.log(e);
        res.send({ message: 'Server Error' })
    }
})
router.post('/notes', async (req, res) =>{
    try {
        const {tag} = req.body;
        console.log(tag)
        if(tag){
            
            const notes = await Note.find({$text:{$search:tag}});
            return res.json({
                notes
            })
        }
        
        const notes = await Note.find();
        return res.json({
            notes
        })

    } catch(e){
        console.log(e);
        res.send({ message: 'Server Error' })
    }
})
router.post('/deletenote', async (req, res) =>{
    try {
        const { noteName } = req.body;
        const notes = await Note.deleteOne({noteName});
        return res.json({
            notes
        })

    } catch(e){
        console.log(e);
        res.send({ message: 'Server Error' })
    }
})
router.post('/deletetag', async (req, res) =>{
    try {
        const { noteName,tag } = req.body;
        const note = await Note.findOne({noteName});
        const noteTags=note.noteTags;
        const tagIndex = noteTags.indexOf(tag);
        if (tagIndex !== -1) {
            noteTags.splice(tagIndex, 1);
        }
        const result = await Note.updateOne({noteName},{$set:{noteTags}});
        
        return res.json({
            result
        })

    } catch(e){
        console.log(e);
        res.send({ message: 'Server Error' })
    }
})
router.post('/addtag',async (req, res) =>{
    try {
        const { noteName,tag } = req.body;
        if(tag.length<=1){
            return res.status(404).json({message:`Tag has to have at least one character!`})
        }
        const result = await Note.updateOne({noteName},{$push: {"noteTags" : tag}});

        return res.json({
           result
       }) 

    } catch(e){
        console.log(e);
        res.send({ message: 'Server Error' })
    }
})
 
module.exports = router;