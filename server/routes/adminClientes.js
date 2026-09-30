import express from 'express'
import crypto  from 'crypto'
import supabaseAdmin from '../lib/supabaseAdmin.js'
import requireAdmin  from '../middleware/requireAdmin.js'

const router = express.Router()

function generarPassword() {
  return crypto.randomBytes(9).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 12)
}

// Crear las credenciales del cliente para una orden
router.post('/ordenes/:id/crear-acceso', requireAdmin, async (req, res) => {
  const { id } = req.params

  try {
    const { data: orden, error: ordenError } = await supabaseAdmin
      .from('ordenes')
      .select('id, email, user_id, novio1, novio2, fecha_boda')
      .eq('id', id)
      .single()

    if (ordenError || !orden) {
      return res.status(404).json({ error: 'Orden no encontrada' })
    }
    if (orden.user_id) {
      return res.status(400).json({ error: 'Esta orden ya tiene acceso creado' })
    }
    if (!orden.fecha_boda) {
      return res.status(400).json({ error: 'Esta orden no tiene fecha de boda. Añádela antes de crear el acceso.' })
    }

    const password = generarPassword()

    const { data: nuevoUsuario, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: orden.email,
      password,
      email_confirm: true,
    })

    if (authError) throw authError

    const { error: updateError } = await supabaseAdmin
      .from('ordenes')
      .update({ user_id: nuevoUsuario.user.id, acceso_habilitado: false })
      .eq('id', id)

    if (updateError) throw updateError

    // La web pública (Panel Novios) lee de "bodas", no de "ordenes" —
    // sin esta fila el cliente no puede acceder aunque tenga usuario creado.
    const { error: bodaError } = await supabaseAdmin
      .from('bodas')
      .insert({
        nombre_pareja: `${orden.novio1} & ${orden.novio2}`,
        fecha_boda:    orden.fecha_boda,
        user_id:       nuevoUsuario.user.id,
      })

    if (bodaError) {
      // Revertimos para poder reintentar limpio si algo falla aquí
      await supabaseAdmin.from('ordenes').update({ user_id: null }).eq('id', id)
      await supabaseAdmin.auth.admin.deleteUser(nuevoUsuario.user.id)
      throw bodaError
    }

    res.json({ email: orden.email, password, user_id: nuevoUsuario.user.id })
  } catch (err) {
    console.error('Error creando acceso de cliente:', err)
    res.status(500).json({ error: 'No se ha podido crear el acceso' })
  }
})

// Habilitar / deshabilitar el acceso ya creado
router.patch('/ordenes/:id/acceso', requireAdmin, async (req, res) => {
  const { id } = req.params
  const { habilitado } = req.body

  try {
    const { error } = await supabaseAdmin
      .from('ordenes')
      .update({ acceso_habilitado: !!habilitado })
      .eq('id', id)

    if (error) throw error
    res.json({ acceso_habilitado: !!habilitado })
  } catch (err) {
    console.error('Error actualizando acceso:', err)
    res.status(500).json({ error: 'No se ha podido actualizar el acceso' })
  }
})

// Eliminar cliente/orden por completo (orden, boda, invitados, fotos, canciones, confirmaciones y su acceso)
router.delete('/ordenes/:id', requireAdmin, async (req, res) => {
  const { id } = req.params

  try {
    const { data: orden, error: ordenError } = await supabaseAdmin
      .from('ordenes')
      .select('id, user_id')
      .eq('id', id)
      .single()

    if (ordenError || !orden) {
      return res.status(404).json({ error: 'Orden no encontrada' })
    }

    // Si tiene acceso creado, borramos el usuario de Auth.
    // Esto arrastra en cascada: bodas -> confirmaciones, fotos, canciones.
    if (orden.user_id) {
      const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(orden.user_id)
      if (authError) {
        console.error('Error borrando usuario de auth (se continúa igualmente):', authError)
      }
    }

    // Borramos la orden. Esto arrastra en cascada: invitados.
    const { error: deleteError } = await supabaseAdmin
      .from('ordenes')
      .delete()
      .eq('id', id)

    if (deleteError) throw deleteError

    res.json({ deleted: true })
  } catch (err) {
    console.error('Error eliminando orden:', err)
    res.status(500).json({ error: 'No se ha podido eliminar' })
  }
})


export default router