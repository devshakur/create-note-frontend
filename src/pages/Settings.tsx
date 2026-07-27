import { useState } from 'react'
import ChangePasswordCard from '../components/settings/ChangePasswordCard'
import ProfileInformationCard from '../components/settings/ProfileInformationCard'
import SettingsPageHeader from '../components/settings/SettingsPageHeader'
import SettingsTabs from '../components/settings/SettingsTabs'
import type { SettingsTabId } from '../components/settings/types'
import { useProfile } from '../hooks/useProfile'

const Settings = () => {
  const { profile, isLoading, error } = useProfile()
  const [activeTab, setActiveTab] = useState<SettingsTabId>('profile')

  const handleTabChange = (tab: SettingsTabId) => {
    setActiveTab(tab)
    const targetId = tab === 'profile' ? 'settings-profile' : 'settings-password'
    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-3 pb-6 sm:px-6 md:pt-4 md:pb-8 xl:px-10">
        <SettingsPageHeader
          title="Settings"
          subtitle="Manage your account settings and preferences."
        />
        <SettingsTabs value={activeTab} onChange={handleTabChange} />

        {isLoading ? (
          <p className="text-sm text-neutral-500">Loading profile...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : profile ? (
          <div className="flex flex-col gap-6">
            <ProfileInformationCard key={profile.id} user={profile} />
            <ChangePasswordCard />
          </div>
        ) : (
          <p className="text-sm text-neutral-500">Unable to load account settings.</p>
        )}

        <footer className="pt-4 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} TakeNote. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default Settings
