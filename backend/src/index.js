// import express from "express";

import { app } from "./app.js"
import DBConnect from "./db/index.js";


import dotenv from "dotenv"

dotenv.config();

const port = process.env.PORT || 3000;


// check the DB connection
DBConnect().then(() => {
   app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);

   })
   console.log("Db is successfully connected");
}).catch((err) => {
   console.log("Db connection error" + err);
})










//.then(() => {
//     // app should be listened on some port
//     app.listen(port, () => {
//         console.log(`Server is listening on port ${port}`);
//     })

//     console.log('jdkfjdk')
// }).catch((error) => {
//     console.log(`DB connection error in src/index.js file ${error}`);
// })




