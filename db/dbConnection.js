import express from "express";
import mongoose from "mongoose";

export const database = async () => {
  console.log(process.env.DB_URL)
  await mongoose.connect(process.env.DB_URL)
  .then(()=>{
    console.log('database connected')
  }).catch((err)=>{
    console.log('database not connected', err)
  })
}
;