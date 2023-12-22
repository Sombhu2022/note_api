import express from 'express'
const server = express()
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import { database } from './db/dbConnection.js'
import router from './router/noteRouter.js';
import cors from 'cors'
import routing from './router/userRouter.js'


database();
server.use(cors({
    origin: [process.env.FRONTEND_URL , 'http://localhost:3000'],
    exposedHeaders: ['X-Total-Count'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,

}))

server.use(cookieParser())
server.use(bodyParser.json())
server.use(express.json())
server.use('/note',router)
server.use('/user', routing )



server.listen(process.env.PORT,()=>{
    console.log(`8080 is a port`)

})