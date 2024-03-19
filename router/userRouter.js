import express from 'express'
import { allUser, createUser, deleteUser, getUser, loginUser, logout } from '../controller/userControler.js'
import { isAuthenticate } from '../middlewares/isAuthenticate.js'
const routing = express.Router()

routing
  .post('/reg' , createUser)
  .post('/login' , loginUser)
  .get('/logout' , isAuthenticate , logout)
  .get('/alluser' , isAuthenticate, allUser)
  .get('/' , isAuthenticate, getUser)
  .delete('/:id' ,isAuthenticate, deleteUser)
  
export default routing
