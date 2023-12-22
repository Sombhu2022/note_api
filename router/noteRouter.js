import exprees from 'express'
import { addNote, deletNote, getNote, getNotes, updateNote } from '../controller/noteControler.js'
import { isAuthenticate } from '../middlewares/userAuthentication.js'
const router = exprees.Router()

router
  .get('/' , getNotes)
  .get('/:id' , getNote)
  .post('/',addNote)
  .delete('/:id' ,deletNote)
  .patch('/:id' , updateNote)

export default router
