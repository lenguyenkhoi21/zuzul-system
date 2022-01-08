import express from 'express'
import { createServer } from 'http'
import path from 'path'


const app = express()
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public')))

const httpServer = createServer(app)

httpServer.listen(3220)