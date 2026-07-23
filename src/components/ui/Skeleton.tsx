interface SkeletonProps {
  className?: string
}

const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-neutral-200/90 ${className}`}
    />
  )
}

export default Skeleton
