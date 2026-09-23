import supabaseAdmin from '../lib/supabaseAdmin.js'

export default async function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ error: 'No autenticado' })
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !user) {
    return res.status(401).json({ error: 'Token inválido' })
  }

  const { data: admin } = await supabaseAdmin
    .from('admin_users')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!admin) {
    return res.status(403).json({ error: 'No autorizado' })
  }

  req.adminUser = user
  next()
}