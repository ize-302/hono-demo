import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hono meets Node.js!')
})
 
const port = process.env.PORT || 3000
console.log(`🔥 Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})