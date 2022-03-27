import Auth from '../components/Auth'
import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import { AuthSession } from '@supabase/supabase-js'
import { supa as supa } from '../lib/supabaseClient'
import Account from '../components/Profile/Account'
// import Footer from '../components/Footer'

const Home: NextPage = ({}) => {
  const [session, setSession] = useState<AuthSession | null>(
    supa.auth.session()
  )

  useEffect(() => {
    setSession(supa.auth.session())
    supa.auth.onAuthStateChange(
      (_event: string, session: AuthSession | null) => {
        setSession(session)
      }
    )
  }, [supa])

  return (
    <div className="bg-stone-900">
      {!session ? <Auth /> : <Account />}

      {/* <Footer /> */}
    </div>
  )
}

export default Home
