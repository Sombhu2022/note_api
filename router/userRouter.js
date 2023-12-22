import express from 'express'
import { allUser, createUser, deleteUser, getUser, loginUser, logout } from '../controller/userControler.js'
import { isAuthenticate } from '../middlewares/userAuthentication.js'
const routing = express.Router()

routing
  .post('/reg' , createUser)
  .post('/login' , loginUser)
  .get('/logout' , isAuthenticate , logout)
  .get('/alluser' , isAuthenticate, allUser)
  .get('/:id' , getUser)
  .delete('/:id' , deleteUser)
  
export default routing