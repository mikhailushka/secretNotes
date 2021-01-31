import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import router from './routes/notes.js'
import { dbURL, dbOptions, port } from './config/config.js'

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(router)

mongoose.set('useCreateIndex', true)
mongoose.connect(dbURL, dbOptions)
mongoose.connection
  .once('open', () => {
    console.log(`Mongoose - successful connection ...`)
    app.listen(process.env.PORT || port,
      () => console.log(`Server start on port ${port} ...`))
  })
  .on('disconnected', () => {
    connected = false;
    console.log('Mongoose - disconnected connection ...')
  })
  .on('error', error => console.warn(error))
