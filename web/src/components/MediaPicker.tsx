'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target

    if (!files) {
      return
    }
    // the user will always select one image, that's why files[0]
    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }
  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        id="media"
        className="invisible h-0 w-0"
        accept="image/*"
      />
      {preview && (
        // you don't need to optimize an image that come form user's computer that's why i'm using <img>
        // eslint-disable-next-line
        <img
          src={preview}
          alt="imagem selecionada"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
