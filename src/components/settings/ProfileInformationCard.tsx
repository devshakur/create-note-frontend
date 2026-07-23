import { Upload } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import type { AuthUser } from '../../types/auth'
import Button from '../ui/Button'
import Input from '../ui/Input'
import SettingsCard from './SettingsCard'

interface ProfileInformationCardProps {
  user: AuthUser
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('') || '?'

const getUsernameFromEmail = (email: string) => email.split('@')[0] ?? ''

const ProfileInformationCard = ({ user }: ProfileInformationCardProps) => {
  const [username, setUsername] = useState(getUsernameFromEmail(user.email))
  const [fullName, setFullName] = useState(user.name)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <SettingsCard
      id="settings-profile"
      title="Profile Information"
      description="Update your profile information and how others see you."
      footer={
        <Button type="submit" form="profile-settings-form" variant="primary">
          Save Changes
        </Button>
      }
    >
      <form
        id="profile-settings-form"
        className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <p className="m-0 text-sm font-semibold text-gray-600">Profile Photo</p>
          <div
            className="flex size-28 items-center justify-center rounded-full bg-(--primary)/20 text-2xl font-semibold text-neutral-800"
            aria-hidden
          >
            {getInitials(fullName || user.name)}
          </div>
          <Button type="button" variant="outline" leftIcon={<Upload className="size-4 text-gray-600!" />}>
            Upload New Photo
          </Button>
          <p className="m-0 text-xs text-neutral-500">
            JPG, PNG or GIF. Max size 2MB.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <Input
            label="Full Name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
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
        </div>
      </form>
    </SettingsCard>
  )
}

export default ProfileInformationCard
