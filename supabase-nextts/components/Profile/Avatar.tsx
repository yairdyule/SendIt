import { useEffect, useState } from 'react'
import { DEFAULT_AVATARS_BUCKET, Error } from '../../lib/constants'
import { supa } from '../../lib/supabaseClient'
import Image from 'next/image'

export default function Avatar({
  url,
  size,
}: {
  url: string | null
  size: number
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supa.storage
        .from(DEFAULT_AVATARS_BUCKET)
        .download(path)
      if (error) throw error

      const url = URL.createObjectURL(data!)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', (error as Error)!.message)
    }
  }

  return avatarUrl ? (
    <Image
      src={avatarUrl}
      className="rounded-full"
      height={size}
      width={size}
      alt="the avatar"
    />
  ) : (
    <div className="avatar no-image" style={{ height: size, width: size }} />
  )
}
