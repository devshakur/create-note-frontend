interface FolderIconProps {
  initials: string
}

const FolderIcon = ({ initials }: FolderIconProps) => {
  return (
    <div
      aria-hidden="true"
      className="relative h-[72px] w-[72px]"
    >
          <div className="absolute top-[6px] left-2 h-3 w-7 rounded-t-md border border-t border-x border-orange-600/25 bg-linear-to-b  from-[#f5a623] to-[#e8941a]" />
          <div className="absolute top-3 flex h-[60px] w-full items-center justify-center rounded-2xl border border-orange-500/30 bg-linear-to-b  from-[#f5a623] to-[#ffd54f] text-base font-semibold tracking-wide text-white shadow-sm">
        {initials}
      </div>
    </div>
  )
}

export default FolderIcon
