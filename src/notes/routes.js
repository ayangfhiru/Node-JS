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

route.put('/notes/:id', async(req, res)=>{
    const noteId = req.params.id;
    const {title, body} = req.body;
    const editNote = await new NotesServices().editNotesById(noteId, {title, body});
    res.json(editNote);
})

route.delete('/notes/:id', async(req, res)=>{
    const noteId = req.params.id;
    const deleteNote = await new NotesServices().deleteNotesById(noteId);
    res.json(deleteNote);
})

module.exports = route;