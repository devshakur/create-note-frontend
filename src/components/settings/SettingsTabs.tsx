import { SETTINGS_TABS } from './constants'
import type { SettingsTabId } from './types'

interface SettingsTabsProps {
  value: SettingsTabId
  onChange: (tab: SettingsTabId) => void
}

const SettingsTabs = ({ value, onChange }: SettingsTabsProps) => {
  return (
    <div className="border-b border-neutral-200">
      <nav aria-label="Settings sections" className="flex gap-6">
        {SETTINGS_TABS.map((tab) => {
          const isActive = tab.id === value

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`relative -mb-px pb-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'font-semibold text-[#9a6700]'
                  : 'text-[#525252] hover:text-[#171717]'
              }`}
            >
              {tab.label}
              {isActive ? (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#b77900]" />
              ) : null}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default SettingsTabs
