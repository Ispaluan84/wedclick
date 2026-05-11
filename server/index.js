import express    from 'express'
import cors       from 'cors'
import dotenv     from 'dotenv'
import bodyParser from 'body-parser'
import { createRequire } from 'module'

import checkoutRoutes from './routes/checkout.js'
import ordersRoutes   from './routes/orders.js'
import stripeWebhook  from './webhooks/stripe.js'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 3001

// ─── Middleware ───────────────────────────────────────────────
app.use('/webhook/stripe', bodyParser.raw({ type: 'application/json' }))

app.use(express.json())
app.use(cors({
  origin:      process.env.CLIENT_URL,
  credentials: true,
}))

// ─── Rutas ───────────────────────────────────────────────────
app.use('/api/checkout', checkoutRoutes)
app.use('/api/orders',   ordersRoutes)
app.use('/webhook',      stripeWebhook)

// ─── Health check ────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'WedClick API funcionando ✅' })
})

// ─── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor WedClick corriendo en puerto ${PORT}`)
})
