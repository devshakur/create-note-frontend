import { getNameInitials, hasCustomProfilePicture } from '../../utils/profilePicture'

interface UserAvatarProps {
  name: string
  profilePicture?: string | null
  className?: string
}

const UserAvatar = ({ name, profilePicture, className = 'size-9' }: UserAvatarProps) => {
  const showPicture = hasCustomProfilePicture(profilePicture)

  if (showPicture && profilePicture) {
    return (
      <img
        src={profilePicture}
        alt={name}
        className={`${className} shrink-0 rounded-full object-cover`}
      />
    )
  }

  return (
    <div
      className={`${className} flex shrink-0 items-center justify-center rounded-full bg-(--primary)/25 text-xs font-semibold text-neutral-800`}
      aria-hidden
    >
      {getNameInitials(name)}
    </div>
  )
}

export default UserAvatar
