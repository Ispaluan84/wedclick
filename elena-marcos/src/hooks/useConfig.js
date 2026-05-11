import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const BODA_ID = import.meta.env.VITE_BODA_ID

export function useConfig() {
  const [config, setConfig]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cargar = async () => {
      const { data, error } = await supabase
        .from('configuraciones')
        .select('config')
        .eq('boda_id', BODA_ID)
        .single()

      if (!error && data) setConfig(data.config)
      setLoading(false)
    }

    cargar()
  }, [])

  return { config, loading }
}