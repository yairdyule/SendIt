import { Error } from '../../lib/constants'
import { useState, useEffect } from 'react'
import { supa as supa } from '../../lib/supabaseClient'
import { useAppDispatch } from '../../store/store'
import { PencilIcon } from '@heroicons/react/outline'
import {
  updateAvatar,
  updateBio,
  updateUsername,
  useAvatar,
  useBio,
  useUsername,
  Profile,
} from '../../store/profileSlice'
import EditModal from './EditModal'
import Avatar from './Avatar'
import Spinner from '../Spinner'

import { FaUsers as FriendIcon } from 'react-icons/fa'
import Friends from './Friends'
import TopTracks from '../TopTracks'
import { useUser } from '@supabase/supabase-auth-helpers/react'

export default function Account() {
  const bio = useBio()
  const avatar = useAvatar()
  const displayName = useUsername()
  const dispatch = useAppDispatch()
  const session = supa.auth.session()
  const user = useUser()

  const [loading, setLoading] = useState<boolean>(true)
  const [modal, setModal] = useState<boolean>(false)
  const [numFriends, setNumFriends] = useState(0)

  async function fetchUser() {
    try {
      setLoading(true)
      const dbUser = supa.auth.user()
      // console.log(dbUser!.id)
      let { data, error } = await supa
        .from('users')
        .select('username, bio, id, avatar_url, updated_at')
        .eq('id', dbUser!.id)
        .maybeSingle()

      if (error) throw error

      if (data) {
        setProfile(data as Profile)
      } else {
        setModal(true)
      }
    } catch (error) {
      alert((error as Error)?.message)
    } finally {
      setLoading(false)
    }
  }
  function setProfile(profile: Profile) {
    dispatch(updateBio(profile.bio))
    dispatch(updateUsername(profile.username))
    dispatch(updateAvatar(profile.avatar_url))
  }

  useEffect(() => {
    fetchUser()
  }, [session])

  return (
    <>
      <div className="w-96 h-80 bg-slate-800 mx-auto pt-6 rounded-md">
        <div className="flex flex-col align-center items-center space-y-6 ">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <PencilIcon
                className="text-md hover:cursor-pointer h-5 w-5 text-slate-500  ml-48"
                onClick={() => setModal(true)}
              />
              <div className="flex flex-col space-y-1 justify-center items-center">
                <Avatar url={avatar} size={100} />
                <h1 className="pt-4 font-medium text-xl text-slate-300">
                  {displayName}
                </h1>
                <p className="text-slate-300 mx-8 text-center text-sm">{bio}</p>
              </div>

              <div className="flex flex-row w-full px-4 items-center justify-center">
                <div>
                  <FriendIcon />
                </div>
              </div>

              {modal && <EditModal open={modal} setOpen={setModal} />}
            </>
          )}
        </div>
      </div>
      <div className="w-full h-screen grid grid-flow-row pt-20 grid-cols-2 grid-rows-2">
        {/* Queues, friends, whatnot */}
        <div className="w-96 h-80 bg-slate-800 mx-auto pt-6 rounded-md">
          <div className="flex flex-col align-center items-center space-y-6 ">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <Friends />
            </div>
          </div>
        </div>
        <div className="w-96 h-80 bg-slate-800 mx-auto pt-6 rounded-md">
          <div className="flex flex-col align-center items-center space-y-6 ">
            <TopTracks />
          </div>
        </div>
      </div>
    </>
  )
}
