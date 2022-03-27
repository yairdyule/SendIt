import { useEffect, useState } from 'react'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import Avatar from './Profile/Avatar'
import Image from 'next/image'

export type Song = {
  title: string
  uri: string
  artists: string
  album_image: string
  url: string
  album_name: string
}

type TopTracks = {
  tracks: Song[]
}

export default function TopTracks() {
  const { data: songs } = useSWR<Song[]>('/api/top-tracks', fetcher)

  return (
    <>
      <h1>tracks</h1>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Artist
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Album</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {songs?.map((song) => {
            return <Song key={song.title} song={song} />
          })}
        </tbody>
      </table>
    </>
  )
}

const Song = ({ song }: { song: Song }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap h-16 w-64"
      >
          <Image src={song.album_image} width="1000" height="1000"/>
      </th>
      <td className="px-6 py-4">{song.title}</td>
      <td className="px-6 py-4">{song.artists}</td>
      <td className="px-6 py-4 text-right">arstneio</td>
    </tr>
  )
}
