import { useState } from 'react';
import type { NoteTimeFilterValue } from '../components/notes/types'
import NoteTimeFilter from '../components/notes/NoteTimeFilter'
import ReminderCard from '../components/reminders/ReminderCard'
import ReminderCardList from '../components/reminders/ReminderCardList';
import { REMINDER_HEADER_COLORS } from '../components/reminders/constants'


const Home = () => {
    const [filter, setFilter] = useState<NoteTimeFilterValue>('today')

  return (
    <div>
    <div className='w-full flex items-center justify-between p-10'>
        <h3 className='text-xl font-semibold'>My Notes</h3>
        <NoteTimeFilter value={filter} onChange={setFilter} />
        </div>
        <div className="p-4">
        <ReminderCardList />  
        </div>
        </div>
  )
}

export default Home