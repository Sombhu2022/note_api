import express from 'express'
const server = express()
import bodyParser from 'body-parser'
import 'dotenv/config'
import { database } from './db/dbConnection.js'
import router from './router/noteRouter.js';
import cors from 'cors'

database();
server.use(cors({
    origin:process.env.FRONTEND_URL || "http://localhost:3000/" ,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,

}))
server.use(bodyParser.json())
server.use(express.json())
server.use('/note',router)



server.listen(process.env.PORT,()=>{
    console.log(`8080 is a port`)

})