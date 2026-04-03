import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import PanelLayout from '../../components/panel/PanelLayout'
import Confirmaciones from './Confirmaciones'
import Canciones from './Canciones'
import DashboardHome from './DashboardHome'

function Dashboard() {
  const navigate = useNavigate()
  const [boda, setBoda] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBoda = async () => {
      const { data: authData } = await supabase.auth.getUser()
      if (!authData?.user) {
        navigate('/panel')
        return
      }

      const { data: bodaData } = await supabase
        .from('bodas')
        .select('*')
        .eq('user_id', authData.user.id)
        .single()

      if (bodaData) setBoda(bodaData)
      setLoading(false)
    }

    loadBoda()
  }, [navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 rounded-full animate-spin" />
      </div>
    )
  }

  if (!boda) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="font-sans text-sm text-gray-500">No se encontró la boda</p>
      </div>
    )
  }

  return (
    <PanelLayout boda={boda}>
      <DashboardHome boda={boda} />
    </PanelLayout>
  )
}

export default Dashboard