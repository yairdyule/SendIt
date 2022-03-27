import { User } from '@supabase/supabase-js'
import { AiFillCheckCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { BsHourglassSplit } from 'react-icons/bs'
import { Friendship } from './Friends'

export const FriendshipButton = ({
  friendship,
  user,
}: {
  friendship: Friendship
  user: User | null
}) => {
  const isMutual = friendship.isMutual
  const isInitiate = friendship.initiate == user!.id



  if (isMutual) {
    return (
      <span className="text-emerald-300">
        <AiFillCheckCircle className="text-emerald-300 bg-emerald-300 w-4 h-4" />
      </span>
    )
  }

  if (!isMutual && isInitiate) {
    return <BsHourglassSplit className="text-red-200 w-4 h-4" />
  } else if (!isMutual && !isInitiate) {
    return <AiOutlinePlusCircle className="text-yellow-300 w-4 h-4" />
  } else {
    return <p>no luck</p>
  }
}
