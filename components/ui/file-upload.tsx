"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileUploadProps extends React.ComponentProps<"div"> {
  accept?: string
  multiple?: boolean
  onFilesSelected?: (files: File[]) => void
  maxSize?: number
}

function FileUpload({
  accept,
  multiple = false,
  onFilesSelected,
  maxSize,
  className,
  ...props
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFiles = React.useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return
      const arr = Array.from(newFiles)
      const filtered = maxSize
        ? arr.filter((f) => f.size <= maxSize)
        : arr
      const next = multiple ? [...files, ...filtered] : filtered
      setFiles(next)
      onFilesSelected?.(next)
    },
    [files, multiple, maxSize, onFilesSelected]
  )

  const removeFile = React.useCallback(
    (index: number) => {
      const next = files.filter((_, i) => i !== index)
      setFiles(next)
      onFilesSelected?.(next)
    },
    [files, onFilesSelected]
  )

  return (
    <div
      data-slot="file-upload"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragOver(false)
          handleFiles(e.dataTransfer.files)
        }}
        data-slot="file-upload-zone"
        data-drag-over={isDragOver || undefined}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-[8px] border-2 border-dashed border-border p-8 text-center transition-colors cursor-pointer hover:border-muted-foreground/50",
          isDragOver && "border-primary bg-primary/5"
        )}
      >
        <Upload className="size-8 text-muted-foreground" />
        <div>
          <p className="text-body-sm font-medium text-heading">
            Click to upload or drag and drop
          </p>
          <p className="text-caption mt-1">
            {accept ? `Supported formats: ${accept}` : "All file types accepted"}
            {maxSize && ` (max ${Math.round(maxSize / 1024 / 1024)}MB)`}
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center justify-between gap-2 rounded-[8px] border border-border px-3 py-2 text-sm"
            >
              <span className="truncate">{file.name}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { FileUpload, type FileUploadProps }
