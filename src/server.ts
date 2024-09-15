require('dotenv').config();

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import apiRoute from '@/routes'

const app = new Hono()

// match any method, all routes
app.use(logger())

//cors
app.use(
  '/api/*',
  cors({
    origin: 'http://localhost:3000',
  })
)

// routes
app.get("/", (c) => c.text("Hello world!"));
app.route('/api', apiRoute)
 
serve(app, (info) => {
  console.log(`🔥 Server is running on port ${info.port}`)
})

export default app