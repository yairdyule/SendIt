import { useUser } from '@supabase/supabase-auth-helpers/react'
import { useEffect, useState } from 'react'
import { supa } from '../../lib/supabaseClient'
import Avatar from './Avatar'
import { Friendship, IFriend } from './Friends'
import { FriendshipButton } from './FriendshipButtons'

export default function Friend({
  friend_id,
  friendship,
}: {
  friend_id: string
  friendship: Friendship
}) {
  const { user } = useUser()
  const [friend, setFriend] = useState<IFriend>()

  console.log(friend_id)
  useEffect(() => {
    ;(async () => {
      let friendProfile = await fetchFriend()
      setFriend(friendProfile)
    })()
  }, [])

  async function fetchFriend() {
    let { data } = await supa
      .from('users')
      .select('username, avatar_url')
      .eq('id', friend_id)
      .single()

    return data as IFriend
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        {<Avatar url={friend?.avatar_url as string} size={35} />}
      </th>
      <td className="px-6 py-4">{friend?.username}</td>
      <td className="px-6 py-4">
        {new Date(friendship.created_at).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 text-right">
        <FriendshipButton user={user} friendship={friendship} />
      </td>
    </tr>
  )
}
