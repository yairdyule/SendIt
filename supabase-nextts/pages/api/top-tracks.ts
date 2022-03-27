import { NextApiRequest, NextApiResponse } from 'next'
import { getTopTracks } from '../../lib/spotify'

type TrackData = {
  artist: string
  songUrl: string
  title: string
}

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    // console.log('arstioarstneioarstneiarst')
    // return res.json({msg: 'arsien'})

    const response = await getTopTracks()
    const { items } = await response.json()

    const tracks = items.slice(0, 10).map((track: any) => ({
      title: track.name,
      artists: track.artists.map((_artist: any) => _artist.name).join(', '),
      album_image: track.album.images[0].url,
      album_name: track.album.name,
      songUrl: track.external_urls.spotify,
      songUri: track.uri,
    })) as TrackData[]

    // console.dir(tracks)
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=43200'
    )
    return res.status(200).json(tracks)
  } catch (error) {
    return res.status(400)
  }
}
