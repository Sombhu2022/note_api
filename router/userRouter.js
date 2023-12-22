import express from 'express'
import { allUser, createUser, deleteUser, getUser, loginUser, logout } from '../controller/userControler.js'
import { isAuthenticate } from '../middlewares/userAuthentication.js'
const routing = express.Router()

routing
  .post('/reg' , createUser)
  .post('/login' , loginUser)
  .get('/logout'  , logout)
  .get('/alluser' , isAuthenticate, allUser)
  .get('/:id' , isAuthenticate, getUser)
  .delete('/:id' ,isAuthenticate, deleteUser)
  
export default routing
