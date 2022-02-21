const express = require('express');
// const { schema } = require('../validation');
const validateNote = require('../validation');
const NotesServices = require('./services');
const route = express.Router();

route.post('/notes', async(req, res)=>{
    try {
        await validateNote.validateAsync(req.body)
        const notes = await new NotesServices().addNotes(req.body);
        res.json({
            status: 'Success',
            message: 'Note create successfully',
            data: notes
        });
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
});

route.get('/notes', async(req, res)=>{
    try {
        const notes = await new NotesServices().getNotes();
        res.json({
            status: 'Success',
            message: 'Data notes',
            data: { notes }
        });
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
});

route.get('/notes/:id', async(req, res)=>{
    try {
     const notesId = req.params.id;
     const getNotesById = await new NotesServices().getNotesById(notesId);
     res.json({
         status: 'Success',
         data: getNotesById
     });   
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
});

route.put('/notes/:id', async(req, res)=>{
    try {
        await validateNote.validateAsync(req.body)
        const noteId = req.params.id;
        // const { title, body } = req.body;
        const editNote = await new NotesServices().editNotesById(noteId, req.body);
        res.json({
            status: 'Success',
            data: editNote
        });
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

route.delete('/notes/:id', async(req, res)=>{
    try {
        const noteId = req.params.id;
        const deleteNote = await new NotesServices().deleteNotesById(noteId);
        res.json({
            status: `Success menghapus Id ${noteId}`,
            message: deleteNote
        });
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

module.exports = route;