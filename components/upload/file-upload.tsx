"use client"

import { useCallback, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export interface FileUploadProps {
  onUpload: (file: File) => void
  acceptedTypes: string[]
  maxSize: number
}

export function FileUpload({ onUpload, acceptedTypes, maxSize }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return
      const file = files[0]
      if (file.size > maxSize) return setError("File too large.")
      if (acceptedTypes.length && !acceptedTypes.includes(file.type) && !file.name.endsWith(".csv"))
        return setError("Unsupported file type.")
      setError(null)
      onUpload(file)
    },
    [acceptedTypes, maxSize, onUpload],
  )

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        onFiles(e.dataTransfer.files)
      }}
      className={`rounded-lg border p-6 text-center ${dragging ? "bg-muted/50" : ""}`}
      aria-label="Drag and drop CSV here"
    >
      <p className="mb-3 text-sm text-muted-foreground">Drag and drop CSV here, or select a file.</p>
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" onClick={() => inputRef.current?.click()}>
          Choose File
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        className="hidden"
        onChange={(e) => onFiles(e.target.files)}
      />
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  )
}
