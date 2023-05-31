import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'

import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'

const app = fastify()

app.register(multipart)

app.register(cors, {
  origin: true, // todas URLs de front-end poderão acessar o back-end
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    // for mobile adds this line
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP server running on http://localhost:3333')
  })
