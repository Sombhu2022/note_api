
import express from "express"
import "dotenv/config"

import bodyParser from "body-parser"
import fileUpload from 'express-fileupload';
import cookieParser from "cookie-parser";

import cors from "cors"
import { v2 as cloudinary } from 'cloudinary';

import noteRouter from './router/noteRouter.js'
import userRouter from './router/userRouter.js'

import {database} from './db/dbConnection.js'


import Agenda from "agenda";
import { sendEmail } from "./utils/sendMail.js";

const app = express()

app.use(bodyParser.json({limit:"50mb"}))
app.use(express.json({ limit: '50mb' }))

// Increase the request size limit for URL-encoded data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(fileUpload(
    {
     limits: { fileSize: 50 * 1024 * 1024 }, // 100 MB (adjust this as needed)
    }
))
app.use(cookieParser())

// job sheduling...

const mongoConnectionString = process.env.AGENDA_DB_URL;
// const mongoConnectionString = "mongodb://127.0.0.1:27017/agenda";


console.log(mongoConnectionString);
// export const agenda = new Agenda({
//     db: { address: mongoConnectionString , collection: 'Jobs' },
//     //   processEvery: '30 seconds',
//       options: { useNewUrlParser: true }
// });

// agenda.on('ready', async() => {
//     console.log('Agenda started!');
//     await agenda.start();
// });

// agenda.on('error', (error) => {
//     console.error('Agenda connection error:', error);
// });


// agenda.define('send email', async (job) => {
//     const { to, subject, body , sendAt } = job.attrs.data;
//     sendEmail(to , subject , `${body}  ${sendAt} `)
//     console.log(sendAt);
//   });

//  console.log("url",process.env.DB_URL);






app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    exposedHeaders: ['X-Total-Count'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}
))


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_DB,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})
 
database();

// (async function() {
//     await agenda.start().then((res)=>{console.log(res);}).catch((err)=>{console.log(err);});
//   })();

app.get('/' , (req , res)=>{
  res.send("This is note api")
})
app.use('/note',noteRouter)
app.use('/user', userRouter)


app.listen(process.env.PORT, () => {
    console.log(`port :- http://localhost:${process.env.PORT}/`)

});
