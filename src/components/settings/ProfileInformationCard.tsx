import { useState, type FormEvent } from 'react'
import type { AuthUser } from '../../types/auth'
import { useUpdateProfile } from '../../hooks/useProfile'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ProfileAvatarUploader from '../settings/ProfileAvatarUploader' 
import SettingsCard from './SettingsCard'

interface ProfileInformationCardProps {
  user: AuthUser
}

const ProfileInformationCard = ({ user }: ProfileInformationCardProps) => {
  const [username, setUsername] = useState(user.username ?? '')
  const [fullName, setFullName] = useState(user.name)
  const [profilePicture, setProfilePicture] = useState(user.profilePicture ?? '')
  const [isUploadingPicture, setIsUploadingPicture] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const { updateProfile, isLoading, error, reset } = useUpdateProfile()

  const isValid =
    fullName.trim().length > 0 &&
    username.trim().length > 0 &&
    user.email.trim().length > 0

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValid || isLoading || isUploadingPicture) return

    setSuccessMessage(null)
    reset()

    try {
      await updateProfile({
        name: fullName.trim(),
        username: username.trim(),
        email: user.email,
      })
      setSuccessMessage('Profile updated successfully.')
    } catch {
      // error is surfaced via the hook
    }
  }

  return (
    <SettingsCard
      id="settings-profile"
      title="Profile Information"
      description="Update your profile information and how others see you."
      footer={
        <Button
          type="submit"
          form="profile-settings-form"
          variant="primary"
          disabled={!isValid || isLoading || isUploadingPicture}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      }
    >
      <form
        id="profile-settings-form"
        className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]"
        onSubmit={handleSubmit}
      >
        <ProfileAvatarUploader
          name={fullName || user.name}
          profilePicture={profilePicture}
          onPictureChange={setProfilePicture}
          disabled={isLoading}
          onUploadingChange={setIsUploadingPicture}
        />

        <div className="flex flex-col gap-4">
          <Input
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
            disabled={isUploadingPicture}
          />
          <Input
            label="Full Name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
            required
            disabled={isUploadingPicture}
          />
          <div className="flex flex-col gap-1.5">
            <Input
              label="Email"
              name="email"
              type="email"
              value={user.email}
              readOnly
              disabled
            />
            <p className="m-0 text-xs text-neutral-500">Email cannot be changed.</p>
          </div>

          {error ? <p className="text-xs text-red-500">{error}</p> : null}
          {successMessage ? (
            <p className="text-xs text-green-600">{successMessage}</p>
          ) : null}
        </div>
      </form>
    </SettingsCard>
  )
}

export default ProfileInformationCard
