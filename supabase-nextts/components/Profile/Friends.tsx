import { useEffect, useState } from 'react'
import { supa } from '../../lib/supabaseClient'
import Avatar from './Avatar'
import { AiFillCheckCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { BsHourglassSplit } from 'react-icons/bs'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import Friend from './Friend'
// import {
//   supabaseServerClient,
//   withAuthRequired,
// } from '@supabase/supabase-auth-helpers/nextjs'

export type IFriend = {
  id: string
  username: string
  avatar_url: string
}

export type Friendship = {
  created_at: string
  id: string
  initiate: string
  isMutual: boolean
  recipient: string
}

function Friends() {
  const { user, error, isLoading } = useUser()
  const [friends, setFriends] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    fetchFriends()
    fetchAllUsers()
  }, [])

  async function fetchFriends() {
    console.log(user)
    try {
      let { data, error } = await supa
        .from('friends')
        .select('id, recipient, initiate, created_at, isMutual')
        .or(`recipient.eq.${user?.id},initiate.eq.${user?.id}`)

      setFriends(data as any[])
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

  async function fetchAllUsers() {
    try {
      let { data, error } = await supa
        .from('users')
        .select('username, avatar_url')
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              Friend
            </th>
            <th scope="col" className="px-6 py-3">
              Friends since
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {friends?.map((friendship) => {
            return (
              <Friend
                key={friendship.id}
                friend_id={
                  friendship.recipient == user!.id
                    ? friendship.initiate
                    : friendship.recipient
                }
                friendship={friendship}
              />
            )
          })}
          <tr>
            <th></th>
            <th></th>
            <th>
              <AiOutlinePlusCircle className="w-8 h-8" />
            </th>
            <th></th>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default Friends
