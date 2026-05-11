import express from 'express'

const router = express.Router()

// ─── Obtener todas las órdenes ────────────────────────────────
router.get('/', async (req, res) => {
  try {
    // Por ahora devolvemos array vacío
    // En el futuro conectaremos con base de datos
    res.json({ orders: [] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router