import { useEffect, useReducer } from 'react'
import ProfileCard from '../components/ProfileCard'
import { Profile } from '../lib/constants'
import { supa } from '../lib/supabaseClient'

type State = {
  profiles: Profile[]
}
type Action = {
  type?: string
  payload: any
}
type ProfileListProps = {
  profiles: Profile[]
}

const handleDatabaseEvent = (state: State, action: Action) => {
  if (action.type == 'upsert') {
    const otherProfiles = state.profiles.filter(
      (x) => x.id != action.payload.id
    )
    return {
      profiles: [action.payload, ...otherProfiles],
    }
  } else if (action.type == 'set') {
    return {
      profiles: action.payload,
    }
  }
  return { profiles: [] }
}

export default function ProfileList({ profiles }: ProfileListProps) {
  const initialState: State = { profiles }
  const [state, dispatch] = useReducer(handleDatabaseEvent, initialState)

  useEffect(() => {
    const subscription = supa
      .from('profiles')
      .on('*', (payload) => {
        dispatch({ type: 'upsert', payload: payload.new })
      })
      .subscribe()
    return () => {
      supa.removeSubscription(subscription)
    }
  }, [])

  useEffect(() => {
    dispatch({ type: 'set', payload: profiles })
  }, [profiles])

  return (
    <>
      {state.profiles.length === 0 ? (
        <p className="opacity-half font-light m-0">
          There are no public profiles created yet.
        </p>
      ) : (
        <div className="profileList">
          {state.profiles?.map((profile: any) => (
            <ProfileCard profile={profile} key={profile.id} />
          ))}
        </div>
      )}
    </>
  )
}
