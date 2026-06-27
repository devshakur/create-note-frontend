import HorizontalCarousel from '../carousel/HorizontalCarousel'
import FolderCard from './FolderCard'
import { SAMPLE_FOLDER_CARDS } from './constants'
import type { FolderCardListProps } from './types'

const FolderCardList = ({
  folders = SAMPLE_FOLDER_CARDS,
  onFolderClick,
}: FolderCardListProps) => {
  return (
    <HorizontalCarousel className="w-full">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="w-[min(100%,104px)] shrink-0 snap-start sm:w-[104px]"
        >
          <FolderCard folder={folder} onClick={onFolderClick} />
        </div>
      ))}
    </HorizontalCarousel>
  )
}

export default FolderCardList
