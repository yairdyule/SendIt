import Link from 'next/link'
import { supa } from '../lib/supabaseClient'

export default function Navbar() {
  const session = supa.auth.session()

  if (!session) {
    return null
  }

  return (
    <ul>
      <Link href="/">GoHere</Link>
      <Link href="/profile">go fart</Link>
    </ul>
  )
}
