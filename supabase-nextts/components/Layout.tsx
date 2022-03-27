import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supa as supa} from '../lib/supabaseClient'
import Auth from './Auth'
import Navbar from './Navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)

  useEffect(() => {
    setSession(supa.auth.session())

    supa.auth.onAuthStateChange(
      (_event: string, session: AuthSession | null) => {
        setSession(session)
      }
    )
  }, [])

  return (
    <div className="h-screen w-screen bg-slate-900 pt-4">
      {!session ? (
        <Auth />
      ) : (
        <div className="flex flex-row justify-between align-center">
          <nav className=" text-slate-200 font-normal text-xl my-2 ml-4 space-y-4 flex flex-col h-screen w-56 border-r-2 border-r-slate-20b">
            <Link href="/">Home</Link>
            {/* <Link href="/dash">Dashboard</Link> */}
            {/* <Link href="/friends">Friends</Link> */}
            {/* <Link href="/queues">Queues</Link> */}
            <a
              onClick={() => {
                supa.auth.signOut()
              }}
              className="hover:cursor-pointer text-slate-400"
            >
              Sign out
            </a>
          </nav>
          <main className="w-full">{children}</main>
        </div>
      )}
    </div>
  )
}
