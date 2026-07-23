import { useState } from 'react'
import ChangePasswordCard from '../components/settings/ChangePasswordCard'
import ProfileInformationCard from '../components/settings/ProfileInformationCard'
import SettingsPageHeader from '../components/settings/SettingsPageHeader'
import SettingsTabs from '../components/settings/SettingsTabs'
import type { SettingsTabId } from '../components/settings/types'
import { useAuth } from '../context/useAuth'

const Settings = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<SettingsTabId>('profile')

  const handleTabChange = (tab: SettingsTabId) => {
    setActiveTab(tab)
    const targetId = tab === 'profile' ? 'settings-profile' : 'settings-password'
    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  if (!user) {
    return (
      <div className="px-4 sm:px-6 xl:px-10">
        <p className="text-sm text-neutral-500">Unable to load account settings.</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-3 pb-6 sm:px-6 md:pt-4 md:pb-8 xl:px-10">
        <SettingsPageHeader
          title="Settings"
          subtitle="Manage your account settings and preferences."
        />
        <SettingsTabs value={activeTab} onChange={handleTabChange} />

        <div className="flex flex-col gap-6">
          <ProfileInformationCard user={user} />
          <ChangePasswordCard />
        </div>

        <footer className="pt-4 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} TakeNote. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default Settings
