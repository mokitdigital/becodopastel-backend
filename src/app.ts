import express from 'express'
import cors from 'cors'
import mongoose, { mongo } from 'mongoose'
import routes from './routes'

class App {
  public express: express.Application

  constructor () {
    this.express = express()

    this.express.use(cors())
    this.database()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
  }

  private database (): void {
    mongoose.connect('mongodb+srv://becodopastel:20denovembro@cluster0.5itqs.mongodb.net/becodopastel?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    mongoose.connection.on('error', console.error.bind(console, 'Error connecting to the database: '))
    mongoose.connection.once('open', function() {
      console.log('Database Connect!!')
    })
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
