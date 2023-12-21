import express from 'express'
import { allUser, createUser, deleteUser, getUser, loginUser, logout } from '../controller/userControler.js'
import { isAuthenticate } from '../middlewares/userAuthentication.js'
const routing = express.Router()

routing
  .post('/' , createUser)
  .get('/login' , loginUser)
  .get('/logout' , isAuthenticate , logout)
  .get('/' , isAuthenticate, allUser)
  .get('/:id' , getUser)
  .delete('/:id' , deleteUser)

export default routing