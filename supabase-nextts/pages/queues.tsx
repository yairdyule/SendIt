import { useEffect, useReducer, useState } from 'react'
import { supa as supa } from '../lib/supabaseClient'

type State = {
  queues: Queue[]
}

type Queue = {
  id: string
  name: string
  from: string
}

type Action = {
  type?: string
  payload: Queue
}

export default function Queues() {
  const [queues, setQueues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getQueues()
  }, [])

  async function getQueues() {
    try {
      const user = supa.auth.user()
      let { data, error } = await supa
        .from('queues')
        .select('title, recipient_ids, contents')
        .eq('created_by', user!.id)
        .limit(10)

      if (error) {
        throw error
      }

      setQueues(data as any[])
    } catch (error) {
      alert((error as any).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading ? (
        <h1>...</h1>
      ) : (
        <>
          <h1>queues</h1>
          <div>
            {queues.map((queue) => (
              <h2 key={queue.title}>{queue.title}</h2>
            ))}
          </div>
        </>
      )}
    </>
  )
}
