import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import CarouselNavButton from './CarouselNavButton'

interface HorizontalCarouselProps {
  children: ReactNode
  className?: string
}

const HorizontalCarousel = ({ children, className = '' }: HorizontalCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    const { scrollLeft, clientWidth, scrollWidth } = container
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
  }, [])

  useEffect(() => {
    updateScrollState()

    const container = scrollRef.current
    if (!container) return

    container.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
      resizeObserver.disconnect()
    }
  }, [updateScrollState, children])

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return

    const firstItem = container.firstElementChild as HTMLElement | null
    const scrollAmount = firstItem
      ? firstItem.offsetWidth + 16
      : container.clientWidth * 0.85

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const showArrows = canScrollLeft || canScrollRight

  return (
    <div className={`relative ${className}`}>
      {showArrows ? (
        <CarouselNavButton
          direction="left"
          icon={ChevronLeft}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
        />
      ) : null}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-1 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {showArrows ? (
        <CarouselNavButton
          direction="right"
          icon={ChevronRight}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
        />
      ) : null}
    </div>
  )
}

export default HorizontalCarousel
