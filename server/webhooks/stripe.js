import express    from 'express'
import Stripe     from 'stripe'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import dotenv     from 'dotenv'
import {
  confirmacionCliente,
  ordenInterna
} from '../emails/templates/confirmacion.js'

dotenv.config()

const router  = express.Router()
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)
const resend  = new Resend(process.env.RESEND_API_KEY)

// Cliente Supabase con service role para bypasear RLS
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

router.post('/stripe', async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook error:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object
    const meta          = paymentIntent.metadata || {}
    const mitad         = paymentIntent.amount   || 0
    const total         = mitad * 2

    if (!meta.email || !meta.novio1 || !meta.novio2) {
      console.log('⚠️ Evento de prueba sin metadata — omitido')
      return res.json({ received: true })
    }

    try {
      // ─── Guardar orden en Supabase ────────────────────────
      const { error: ordenError } = await supabase
        .from('ordenes')
        .insert({
          stripe_id:         paymentIntent.id,
          plan:              meta.plan              || 'esencial',
          estado:            'pendiente',
          novio1:            meta.novio1,
          novio2:            meta.novio2,
          email:             meta.email,
          telefono:          meta.telefono          || '',
          canal_contacto:    meta.canal_contacto    || '',
          horario_contacto:  meta.horario_contacto  || '',
          fecha_boda:        meta.fecha_boda        || null,
          lugar_ceremonia:   meta.lugar_ceremonia   || '',
          lugar_celebracion: meta.lugar_celebracion || '',
          estilo:            meta.estilo            || '',
          notas:             meta.notas             || '',
          importe_pagado:    mitad,
          importe_total:     total,
          importe_pendiente: mitad,
        })

      if (ordenError) {
        console.error('Error guardando orden:', ordenError)
      } else {
        console.log(`✅ Orden guardada para ${meta.novio1} & ${meta.novio2}`)
      }

      // ─── Enviar emails ────────────────────────────────────
      const templateCliente = confirmacionCliente({
        novio1:    meta.novio1,
        novio2:    meta.novio2,
        plan:      meta.plan      || 'esencial',
        fechaBoda: meta.fecha_boda || 'Por confirmar',
        total,
        mitad,
      })

      const templateInterna = ordenInterna({
        novio1:    meta.novio1,
        novio2:    meta.novio2,
        plan:      meta.plan      || 'esencial',
        fechaBoda: meta.fecha_boda || 'Por confirmar',
        mitad,
        formulario: {
          email:             meta.email,
          telefono:          meta.telefono          || '',
          canalContacto:     meta.canal_contacto    || '',
          horarioContacto:   meta.horario_contacto  || '',
          numInvitados:      meta.num_invitados     || '',
          lugarCeremonia:    meta.lugar_ceremonia   || '',
          lugarCelebracion:  meta.lugar_celebracion || '',
          estilo:            meta.estilo            || '',
          notas:             meta.notas             || 'Sin notas',
        },
      })

      // Reemplaza por esto:
      const emailCliente = await resend.emails.send({
        from:    process.env.EMAIL_FROM,
        to:      meta.email,
        subject: templateCliente.subject,
        html:    templateCliente.html,
      })

      console.log('📧 Email cliente:', JSON.stringify(emailCliente))

      const emailInterno = await resend.emails.send({
        from:    process.env.EMAIL_FROM,
        to:      process.env.EMAIL_TO,
        subject: templateInterna.subject,
        html:    templateInterna.html,
      })

      console.log('📧 Email interno:', JSON.stringify(emailInterno))

      console.log(`✅ Emails enviados para ${meta.novio1} & ${meta.novio2}`)
    } catch (err) {
      console.error('Error procesando webhook:', err)
    }
  }

  res.json({ received: true })
})

export default router