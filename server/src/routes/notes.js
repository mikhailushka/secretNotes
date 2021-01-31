import Router from 'express'
import * as notesController from '../controllers/notes.js'

const router = Router()

router.post('/notes', notesController.notesCreateNote);
router.get('/:uniqUrl', notesController.notesGetNote)
router.post('/:uniqUrl/:password', notesController.notesAceesToNote)
router.delete('/:uniqUrl/:password', notesController.notesDeleteNote)

export default router
