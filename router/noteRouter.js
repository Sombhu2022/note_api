import exprees from 'express'
import { addNote, deletNote, getNote, getNotes, updateNote } from '../controller/noteControler.js'

const router = exprees.Router()

router
  .get('/' , getNotes)
  .get('/:id' , getNote)
  .post('/',addNote)
  .delete('/:id' ,deletNote)
  .patch('/:id' , updateNote)

export default router