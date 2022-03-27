import { useState } from 'react'
import { supa } from '../lib/supabaseClient'
import Spinner from './Spinner'
import { FaRegPaperPlane, FaSpotify as Spotify } from 'react-icons/fa'
// import { AiOutlineGithub as Github } from 'react-icons/ai'
import { FaPaperPlane } from 'react-icons/fa'
import { BiPaperPlane } from 'react-icons/bi'

export default function Auth({}) {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async () => {
    try {
      setLoading(true)
      const { user, session, error } = await supa.auth.signIn({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      alert((error as Error).message || (error as Error).message)
    } finally {
      setLoading(false)
      setEmail('')
      setPassword('')
    }
  }

  const handleRegistration = async () => {
    try {
      setLoading(true)
      const { user, session, error } = await supa.auth.signUp({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      alert((error as Error).message || (error as Error).message)
    } finally {
      setLoading(false)
      setEmail('')
      setPassword('')
    }
  }

  const handleSpotify = async () => {
    try {
      setLoading(true)
      const { user, session, error } = await supa.auth.signIn({
        provider: 'spotify',
      })
      if (error) throw error
    } catch (error) {
      console.log((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen space-y-2 flex flex-col justify-center items-center">
      {/* <FaRegPaperPlane className="w-12 h-12" /> */}
      <BiPaperPlane className="w-12 h-12 text-emerald-400" />
      <h1 className="font-medium text-3xl ">
        Sign in to <span className="text-emerald-400">Send It</span>
      </h1>
      {/* <h1 className="header">Send It.</h1> */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email@example.com"
        className="w-64 rounded-lg "
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="p4s5w0rd"
        className="w-64 rounded-lg "
      />
      <button
        onClick={(e) => {
          e.preventDefault()
          handleLogin()
        }}
        className="w-48 h-10 bg-emerald-500 mx-auto flex flex-row justify-center items-center"
        disabled={loading}
      >
        <span className="font-medium mx-auto">
          {loading ? <Spinner /> : 'Sign in'}
        </span>
      </button>

      <div className="flex flex-row justify-center content-center">
        <button
          className="bg-transparent border-none"
          onClick={(e) => {
            e.preventDefault()
            handleSpotify()
          }}
        >
          <Spotify className="w-6 h-6" />
        </button>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault()
          handleRegistration()
        }}
        className="w-48 h-10 bg-transparent border-none"
        disabled={loading}
      >
        <span className="font-light text-sm text-slate-300">Register</span>
      </button>
    </div>
  )
}
