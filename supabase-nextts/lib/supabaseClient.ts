import { createClient } from '@supabase/supabase-js'
import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
} from './constants'

if (!NEXT_PUBLIC_SUPABASE_ANON_KEY) throw new Error('Missing env anon keyy')
if (!NEXT_PUBLIC_SUPABASE_URL) throw new Error('Missing env URL')

export const supa = createClient(
  NEXT_PUBLIC_SUPABASE_URL as string,
  NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export const useSupa = () => {
  return createClient(
    NEXT_PUBLIC_SUPABASE_URL as string,
    NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  )
}
