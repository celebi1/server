import express from 'express'

import postgresClient from './config/db.js'

import userRouter from './routers/userRouter.js'

import cors from 'cors'

const app = express()
app.use(express.json())

// const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

// app.use(function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
    
// });

app.use(cors());


app.use('/users', userRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    postgresClient.connect(err => {
        if(err) {
            console.log('connection error', err.stack)
        }else {
            console.log('db connection successful')
        }
    })
})
