const express = require('express');
const router = express.Router();
const { getNotes, createNote,getNoteById,updateNote,DeleteNote} = require('../controllers/noteController');
const verifyJWT = require('../middlewares/verifyJWT');


// commit to server Restart

router.route('/').get(verifyJWT,getNotes);
router.route('/create').post(verifyJWT,createNote);
router.route('/:id').get(getNoteById)
      .put(verifyJWT,updateNote)
      .delete(verifyJWT,DeleteNote)
 




module.exports = router;
