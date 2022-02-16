const express = require('express');
const NotesServices = require('./services');
const route = express.Router();

route.post('/notes', async(req, res)=>{
    const {title, body} =  req.body;
    const notes = await new NotesServices().addNotes({title, body})
    res.json(notes)
});

route.get('/notes', async(req, res)=>{
    const notes = await new NotesServices().getNotes();
    res.json(notes);
});

route.get('/notes/:id', async(req, res)=>{
    const notesId =  req.params.id;
    const getNotesById = await new NotesServices().getNotesById(notesId);
    res.json(getNotesById);
});

module.exports = route;