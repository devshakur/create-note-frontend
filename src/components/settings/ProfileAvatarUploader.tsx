import { Check, Upload } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useUploadProfilePicture } from '../../hooks/useProfile'
import { getNameInitials } from '../../utils/profilePicture'
import Button from '../ui/Button'

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
] as const
const MAX_FILE_SIZE = 2 * 1024 * 1024
const CHECKMARK_MS = 800

interface ProfileAvatarUploaderProps {
  name: string
  profilePicture: string
  onPictureChange: (url: string) => void
  onUploadingChange?: (isUploading: boolean) => void
  disabled?: boolean
}

const getInitials = getNameInitials

const ProfileAvatarUploader = ({
  name,
  profilePicture,
  onPictureChange,
  onUploadingChange,
  disabled = false,
}: ProfileAvatarUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const previewUrlRef = useRef<string | null>(null)
  const previousPictureRef = useRef(profilePicture)
  const checkmarkTimeoutRef = useRef<number | null>(null)

  const [displaySrc, setDisplaySrc] = useState(profilePicture)
  const [showCheckmark, setShowCheckmark] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const { uploadProfilePicture, isUploading, error, reset } =
    useUploadProfilePicture()

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
      if (checkmarkTimeoutRef.current !== null) {
        window.clearTimeout(checkmarkTimeoutRef.current)
      }
    }
  }, [])

  const clearPreviewUrl = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = null
    }
  }

  const handlePickFile = () => {
    if (disabled || isUploading) return
    inputRef.current?.click()
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setLocalError(null)
    reset()

    if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
      setLocalError('Only JPEG, PNG, WebP, and GIF images are allowed.')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setLocalError('Image must not be larger than 2MB.')
      return
    }

    previousPictureRef.current = displaySrc || profilePicture
    clearPreviewUrl()

    const objectUrl = URL.createObjectURL(file)
    previewUrlRef.current = objectUrl
    setDisplaySrc(objectUrl)
    setShowCheckmark(false)
    onUploadingChange?.(true)

    try {
      const response = await uploadProfilePicture(file)
      const cloudinaryUrl = response.data.profilePicture

      clearPreviewUrl()
      setDisplaySrc(cloudinaryUrl)
      onPictureChange(cloudinaryUrl)
      setShowCheckmark(true)

      if (checkmarkTimeoutRef.current !== null) {
        window.clearTimeout(checkmarkTimeoutRef.current)
      }
      checkmarkTimeoutRef.current = window.setTimeout(() => {
        setShowCheckmark(false)
        checkmarkTimeoutRef.current = null
      }, CHECKMARK_MS)
    } catch {
      clearPreviewUrl()
      setDisplaySrc(previousPictureRef.current)
      setShowCheckmark(false)
    } finally {
      onUploadingChange?.(false)
    }
  }

  const displayError = localError ?? error
  const controlsDisabled = disabled || isUploading

  return (
    <div className="flex flex-col gap-3">
      <p className="m-0 text-sm font-semibold text-gray-600">Profile Photo</p>

      <div className="relative size-28">
        {displaySrc ? (
          <img
            src={displaySrc}
            alt={name}
            className={`size-28 rounded-full object-cover transition-[filter,opacity] ${
              isUploading ? 'avatar-upload-pulse' : ''
            }`}
          />
        ) : (
          <div
            className={`flex size-28 items-center justify-center rounded-full bg-(--primary)/20 text-2xl font-semibold text-neutral-800 ${
              isUploading ? 'avatar-upload-pulse' : ''
            }`}
            aria-hidden
          >
            {getInitials(name)}
          </div>
        )}

        {isUploading ? (
          <div
            className="pointer-events-none absolute inset-0 rounded-full bg-black/10"
            aria-hidden
          />
        ) : null}

        {showCheckmark ? (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <span className="avatar-check-pop flex size-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
              <Check className="size-5" strokeWidth={3} />
            </span>
          </div>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_MIME_TYPES.join(',')}
        className="sr-only"
        onChange={handleFileChange}
        disabled={controlsDisabled}
      />

      <Button
        type="button"
        variant="outline"
        className="border-(--primary) text-neutral-800 hover:bg-(--primary)/10"
        leftIcon={<Upload className="size-4 text-neutral-700" />}
        onClick={handlePickFile}
        disabled={controlsDisabled}
      >
        {isUploading ? 'Uploading...' : 'Upload New Photo'}
      </Button>

      <p className="m-0 text-xs text-neutral-500">
        JPG, PNG, WebP or GIF. Max size 2MB.
      </p>

      {displayError ? (
        <p className="m-0 text-xs text-red-500">{displayError}</p>
      ) : null}
    </div>
  )
}

export default ProfileAvatarUploader
