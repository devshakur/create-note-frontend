import { useState, type FormEvent } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'
import SettingsCard from './SettingsCard'

const ChangePasswordCard = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const isValid =
    currentPassword.trim().length > 0 &&
    newPassword.trim().length >= 8 &&
    newPassword === confirmPassword

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValid) return
  }

  return (
    <SettingsCard
      id="settings-password"
      title="Change Password"
      description="Ensure your account is using a long, random password to stay secure."
      footer={
        <Button
          type="submit"
          form="password-settings-form"
          variant="primary"
          disabled={!isValid}
        >
          Update Password
        </Button>
      }
    >
      <form
        id="password-settings-form"
        className="mx-auto flex w-full max-w-xl flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          label="Current Password"
          name="currentPassword"
          type="password"
          placeholder="Enter your current password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <div className="flex flex-col gap-1.5">
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p className="m-0 text-xs text-neutral-500">
            Password must be at least 8 characters.
          </p>
        </div>
        <Input
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </form>
    </SettingsCard>
  )
}

export default ChangePasswordCard
