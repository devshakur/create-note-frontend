import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'
import { useChangePassword } from '../../hooks/useAuth'
import Button from '../ui/Button'
import Input from '../ui/Input'
import SettingsCard from './SettingsCard'

const ChangePasswordCard = () => {
  const navigate = useNavigate()
  const { logout: clearSession } = useAuth()
  const { changePassword, error, isLoading, reset } = useChangePassword()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState<string | null>(null)

  const passwordsMatch = newPassword === confirmPassword
  const isDifferentFromCurrent = newPassword !== currentPassword

  const isValid =
    currentPassword.trim().length > 0 &&
    newPassword.trim().length >= 8 &&
    confirmPassword.trim().length > 0 &&
    passwordsMatch &&
    isDifferentFromCurrent

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return

    setValidationError(null)
    reset()

    if (newPassword !== confirmPassword) {
      setValidationError('New password and confirm password do not match')
      return
    }

    if (newPassword === currentPassword) {
      setValidationError('New password must be different from current password')
      return
    }

    if (newPassword.trim().length < 8) {
      setValidationError('Password must be at least 8 characters')
      return
    }

    if (!isValid) return

    try {
      const response = await changePassword({
        oldPassword: currentPassword,
        newPassword,
        confirmPassword,
      })
      if (!response) return

      // Backend clears the auth cookie on success — clear local session and redirect.
      clearSession()
      navigate('/login', { replace: true })
    } catch {
      // error is surfaced via the hook
    }
  }

  const displayError = validationError ?? error

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
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Password'}
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
          onChange={(e) => {
            setCurrentPassword(e.target.value)
            setValidationError(null)
          }}
          disabled={isLoading}
          required
        />
        <div className="flex flex-col gap-1.5">
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
              setValidationError(null)
            }}
            disabled={isLoading}
            required
            error={
              newPassword.length > 0 && newPassword.length < 8
                ? 'Password must be at least 8 characters'
                : undefined
            }
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
          onChange={(e) => {
            setConfirmPassword(e.target.value)
            setValidationError(null)
          }}
          disabled={isLoading}
          required
          error={
            confirmPassword.length > 0 && !passwordsMatch
              ? 'New password and confirm password do not match'
              : undefined
          }
        />

        {displayError ? (
          <p className="m-0 text-xs text-red-500">{displayError}</p>
        ) : null}
      </form>
    </SettingsCard>
  )
}

export default ChangePasswordCard
