import express from 'express'
import Stripe  from 'stripe'
import dotenv  from 'dotenv'

dotenv.config()

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const precios = {
  esencial:    parseInt(process.env.PRICE_ESENCIAL),
  premium:     parseInt(process.env.PRICE_PREMIUM),
  lanzamiento: parseInt(process.env.PRICE_LANZAMIENTO),
}

const nombresPlan = {
  esencial:    'WedClick Esencial',
  premium:     'WedClick Premium',
  lanzamiento: 'WedClick Lanzamiento',
}

// ─── Crear Payment Intent (50% del total) ────────────────────
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { plan, formulario } = req.body

    if (!precios[plan]) {
      return res.status(400).json({ error: 'Plan no válido' })
    }

    const total  = precios[plan]
    const mitad  = Math.round(total / 2)
    const nombre = `${formulario.novio1} & ${formulario.novio2}`

    const paymentIntent = await stripe.paymentIntents.create({
      amount:   mitad,
      currency: 'eur',
      metadata: {
        plan,
        nombre,
        fecha_boda:        formulario.fechaBoda,
        novio1:            formulario.novio1,
        novio2:            formulario.novio2,
        email:             formulario.email,
        telefono:          formulario.telefono,
        canal_contacto:    formulario.canalContacto,
        horario_contacto:  formulario.horarioContacto,
        num_invitados:     formulario.numInvitados,
        lugar_ceremonia:   formulario.lugarCeremonia,
        lugar_celebracion: formulario.lugarCelebracion,
        estilo:            formulario.estilo,
        notas:             formulario.notas || '',
      },
      description:   `${nombresPlan[plan]} — Reserva 50% — ${nombre}`,
      receipt_email: formulario.email,
    })

    res.json({
      clientSecret:    paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount:          mitad,
      total,
      plan,
    })

  } catch (error) {
    console.error('Error creando PaymentIntent:', error)
    res.status(500).json({ error: error.message })
  }
})

// ─── Confirmar pago ───────────────────────────────────────────
router.post('/confirm', async (req, res) => {
  try {
    const { paymentIntentId } = req.body

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'El pago no se ha completado' })
    }

    res.json({
      success:  true,
      metadata: paymentIntent.metadata,
      amount:   paymentIntent.amount,
    })

  } catch (error) {
    console.error('Error confirmando pago:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router