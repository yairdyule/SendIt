import { ChangeEventHandler } from 'react'

export type UploadButtonProps = {
  onUpload: ChangeEventHandler<HTMLInputElement>
  loading: boolean
}

export default function UploadButton(props: UploadButtonProps) {
  return (
    <div>
      <label className="button primary block" htmlFor="single">
        {props.loading ? 'Uploading ...' : 'Upload'}
      </label>
      <input
        type="file"
        id="single"
        accept="image/*"
        onChange={props.onUpload}
        disabled={props.loading}
        style={{ visibility: 'hidden', position: 'absolute' }}
      />
    </div>
  )
}
