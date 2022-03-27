import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, useAppSelector } from './store'

export interface Profile {
  username: string
  bio: string
  avatar_url: string | null
  updated_at: Date
  created_at: Date
}

const initialState = {} as Profile

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    updateAvatar: (state, action: PayloadAction<string | null>) => {
      state.avatar_url = action.payload
      state.updated_at = new Date()
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
      state.updated_at = new Date()
    },
    updateBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload
      state.updated_at = new Date()
    },
  },
})

export const { updateBio, updateAvatar, updateUsername } =
  profileSlice.actions

export const useProfile = () => useAppSelector((state) => state.profile)
export const useAvatar = () => useAppSelector((state) => state.profile.avatar_url)
export const useBio = () => useAppSelector((state) => state.profile.bio)
export const useUsername = () => useAppSelector((state) => state.profile.username)

export default profileSlice.reducer
