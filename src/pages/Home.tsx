import { useState } from 'react'
import NotesPageHeader from '../components/notes/NotesPageHeader'
import type { NoteTimeFilterValue } from '../components/notes/types'
import FolderCardList from '../components/folders/FolderCardList'
import ReminderCardList from '../components/reminders/ReminderCardList'
import SidebarDivider from '../components/sidebar/SidebarDivider'

const Home = () => {
  const [filter, setFilter] = useState<NoteTimeFilterValue>('today')

  return (
    <div className="flex h-full flex-col ">
      <NotesPageHeader title="My Notes" value={filter} onChange={setFilter} className='md:p-10' />
      <div className="px-4 pb-4 md:px-12">
        <ReminderCardList />
      </div>
      <div className='px-6'>
        <SidebarDivider />
      </div>
      <NotesPageHeader title="Recent Folders" value={filter} onChange={setFilter} className="md:p-10" />
      <div className="px-4 pb-4 md:px-12">
        <FolderCardList />
      </div>
    </div>
  )
}

export default Home