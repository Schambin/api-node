const { Router } = require("express");

const NotesController = require('../controllers/notes-controller');

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.post('/:user_id', notesController.create);
notesRoutes.get('/', notesController.list);
notesRoutes.get('/:id', notesController.show);
notesRoutes.delete('/:id', notesController.delete);

module.exports = notesRoutes;