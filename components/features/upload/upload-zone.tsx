'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertCircle,
  CheckCircle2,
  ImageIcon,
  Loader2,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { usePlatformData } from '@/hooks/use-platform-data'
import {
  compressImage,
  formatFileSize,
  validateImageFile,
} from '@/utils/image'
import { cn } from '@/lib/utils'

type Stage = 'idle' | 'preview' | 'uploading' | 'error'

export function UploadZone() {
  const router = useRouter()
  const { uploadAndAnalyze } = usePlatformData()
  const inputRef = useRef<HTMLInputElement>(null)

  const [stage, setStage] = useState<Stage>('idle')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const reset = useCallback(() => {
    setStage('idle')
    setFile(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setProgress(0)
    setError(null)
  }, [preview])

  const handleFile = useCallback(
    async (f: File) => {
      const validationError = validateImageFile(f)
      if (validationError) {
        setError(validationError)
        setStage('error')
        return
      }

      setError(null)
      setFile(f)
      setPreview(URL.createObjectURL(f))
      setStage('preview')
    },
    [],
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const f = e.dataTransfer.files[0]
      if (f) handleFile(f)
    },
    [handleFile],
  )

  async function startAnalysis() {
    if (!file) return
    setStage('uploading')
    setProgress(0)

    const tick = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 18, 92))
    }, 200)

    try {
      const { dataUrl, compressedSize } = await compressImage(file)
      const report = await uploadAndAnalyze({
        fileName: file.name,
        fileSize: compressedSize,
        mimeType: file.type,
        thumbnailUrl: dataUrl,
      })
      setProgress(100)
      clearInterval(tick)
      router.push(`/dashboard/reports/${report.id}`)
    } catch {
      clearInterval(tick)
      setError('Upload failed. Please try again.')
      setStage('error')
    }
  }

  return (
    <div className="space-y-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) handleFile(f)
        }}
      />

      <AnimatePresence mode="wait">
        {stage === 'idle' || stage === 'error' ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-12 text-center transition-all',
              dragOver
                ? 'border-primary bg-primary/10 glow-ring'
                : 'border-border/60 bg-secondary/20 hover:border-primary/50 hover:bg-secondary/30',
            )}
          >
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-105">
              <Upload className="size-8 text-primary" />
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold">
              Drop your fabric image here
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              or click to browse — PNG, JPG, JPEG up to 10 MB
            </p>
            {error ? (
              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-destructive">
                <AlertCircle className="size-4" />
                {error}
              </p>
            ) : null}
          </motion.div>
        ) : null}

        {stage === 'preview' || stage === 'uploading' ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass overflow-hidden rounded-2xl border border-border/60"
          >
            <div className="relative aspect-video w-full bg-secondary/30">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Preview"
                  className="size-full object-contain"
                />
              ) : null}
              {stage === 'uploading' ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
                  <Loader2 className="size-10 animate-spin text-primary" />
                  <p className="mt-3 text-sm font-medium">
                    Running AI analysis…
                  </p>
                  <div className="mt-4 h-2 w-64 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">
                    {Math.round(progress)}%
                  </p>
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between border-t border-border/50 p-4">
              <div className="flex items-center gap-3">
                <ImageIcon className="size-5 text-accent" />
                <div className="text-left">
                  <p className="text-sm font-medium">{file?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file ? formatFileSize(file.size) : ''}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {stage === 'preview' ? (
                  <>
                    <Button variant="outline" size="sm" onClick={reset}>
                      <X className="mr-1 size-4" />
                      Remove
                    </Button>
                    <Button
                      size="sm"
                      className="glow-ring"
                      onClick={startAnalysis}
                    >
                      <CheckCircle2 className="mr-1 size-4" />
                      Analyze fabric
                    </Button>
                  </>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { title: 'Drag & drop', desc: 'Instant preview' },
          { title: 'Auto-compress', desc: 'Optimized for analysis' },
          { title: 'AI report', desc: 'Results in seconds' },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border/50 bg-secondary/20 p-4 text-center"
          >
            <p className="text-sm font-medium">{item.title}</p>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
