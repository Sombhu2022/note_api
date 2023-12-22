import exprees from 'express'
import { addNote, deletNote, getNote, getNotes, updateNote } from '../controller/noteControler.js'
import { isAuthenticate } from '../middlewares/isAuthenticate.js'

const router = exprees.Router()

router
  .get('/' , isAuthenticate , getNotes)
  .get('/:id' , isAuthenticate, getNote)
  .post('/',isAuthenticate, addNote)
  .delete('/:id' ,isAuthenticate , deletNote)
  .patch('/:id' , isAuthenticate, updateNote)

export default router