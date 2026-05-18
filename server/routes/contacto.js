import express    from 'express'
import { Resend } from 'resend'
import dotenv     from 'dotenv'

dotenv.config()

const router = express.Router()
const resend = new Resend(process.env.RESEND_API_KEY)

router.post('/', async (req, res) => {
  const { novio1, novio2, fecha, lugarCeremonia, lugarCelebracion, contacto, consulta } = req.body

  if (!novio1 || !novio2 || !consulta) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' })
  }

  try {
    await resend.emails.send({
      from:    process.env.EMAIL_FROM,
      to:      process.env.EMAIL_TO,
      subject: `💌 Nueva consulta de ${novio1} & ${novio2}`,
      html: `
        <h2>Nueva consulta desde WedClick</h2>
        <p><strong>Novios:</strong> ${novio1} & ${novio2}</p>
        <p><strong>Fecha de boda:</strong> ${fecha || 'No indicada'}</p>
        <p><strong>Lugar ceremonia:</strong> ${lugarCeremonia || 'No indicado'}</p>
        <p><strong>Lugar celebración:</strong> ${lugarCelebracion || 'No indicado'}</p>
        <p><strong>Contacto:</strong> ${contacto || 'No indicado'}</p>
        <hr/>
        <p><strong>Consulta:</strong></p>
        <p>${consulta}</p>
      `,
    })

    res.json({ ok: true })
  } catch (error) {
    console.error('Error enviando contacto:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router