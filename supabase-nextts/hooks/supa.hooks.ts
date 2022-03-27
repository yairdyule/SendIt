import { AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supa } from '../lib/supabaseClient'

export const useSupaSession = () => {
  const [session, setSession] = useState<AuthSession | null>()
  useEffect(() => {
    setSession(supa.auth.session())
  }, [])
  return session
}
