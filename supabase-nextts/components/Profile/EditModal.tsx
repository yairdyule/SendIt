import { Dialog, Transition } from '@headlessui/react'
import {
  ChangeEvent,
  Dispatch,
  Fragment,
  SetStateAction,
  useRef,
  useState,
} from 'react'
import { ExclamationIcon, PencilIcon } from '@heroicons/react/outline'
import { supa as supa } from '../../lib/supabaseClient'
import { DEFAULT_AVATARS_BUCKET } from '../../lib/constants'
import { AuthSession, Session } from '@supabase/supabase-js'
import UploadButton from '../UploadButton'
import { useAppDispatch } from '../../store/store'
import {
  updateAvatar,
  updateBio,
  updateUsername,
  useProfile,
} from '../../store/profileSlice'

interface EditModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function EditModal({ open, setOpen }: EditModalProps) {
  const profile = useProfile()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [username, setUsername] = useState(profile.username)
  const [bio, setBio] = useState(profile.bio)

  const cancelButtonRef = useRef(null)

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length == 0) {
        throw new Error('You must select an image to upload.')
      }

      const user = supa.auth.user()
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${
        supa.auth.session()!.user!.id
      }${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supa.storage
        .from(DEFAULT_AVATARS_BUCKET)
        .upload(filePath, file)

      if (uploadError) throw uploadError

      let { error: updateError } = await supa.from('users').upsert({
        id: user!.id,
        avatar_url: filePath,
      })

      if (updateError) throw updateError

      dispatch(updateAvatar(null))
      dispatch(updateAvatar(filePath))
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setUploading(false)
    }
  }

  async function updateProfile() {
    try {
      setLoading(true)
      const user = supa.auth.user()

      const updates = {
        id: user!.id,
        username: username,
        bio: bio,
        updated_at: new Date(),
      }

      console.log(updates)

      let { error } = await supa.from('users').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }

      if (updates.bio != profile.bio) dispatch(updateBio(updates.bio))
      if (updates.username != profile.username)
        dispatch(updateUsername(updates.username))
    } catch (error) {
      alert((error as Error)?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              await updateProfile()
              setOpen(false)
            }}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-50 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative inline-block align-bottom bg-slate-600 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-slate-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-600 sm:mx-0 sm:h-10 sm:w-10">
                        <PencilIcon
                          className="h-6 w-6 text-emerald-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-slate-300"
                        >
                          Edit Account
                        </Dialog.Title>
                        <div className="mt-2">
                          <label
                            className="text-md text-gray-500"
                            htmlFor="username"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            className="text-md text-gray-200 bg-slate-800"
                            id="username"
                            placeholder={profile.username}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="mt-2">
                          <label className="text-md text-gray-500">Bio</label>
                          <textarea
                            className="text-md text-gray-200 px-2 py-1 bg-slate-800 rounded-md w-64"
                            placeholder={profile.bio}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                          />
                        </div>
                        <UploadButton
                          onUpload={uploadAvatar}
                          loading={uploading}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-gray-300 hover:bg-gray-800 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </form>
        </Dialog>
      </Transition.Root>
    </>
  )
}
