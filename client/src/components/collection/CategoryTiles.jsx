import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CATEGORIES } from '@/data/productsData'

export default function CategoryTiles({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {},
}) {
  const scrollRef = useRef(null)

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -240 : 240
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative mb-8 sm:mb-12">
      {/* Scroll controls (visible on tablets/desktops when overflow exists) */}
      <div className="hidden sm:flex items-center justify-between mb-4">
        <span className="font-body text-xs font-semibold uppercase tracking-widest-2 text-charcoal/50">
          Browse by Category
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleScroll('left')}
            className="p-1.5 rounded-full border border-sand hover:border-gold hover:text-gold text-charcoal/60 transition-colors"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="p-1.5 rounded-full border border-sand hover:border-gold hover:text-gold text-charcoal/60 transition-colors"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontally scrollable container (on mobile and desktop) */}
      <div
        ref={scrollRef}
        className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0"
        role="tablist"
        aria-label="Jewellery Categories"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug
          const count = categoryCounts[cat.slug] ?? 0

          return (
            <motion.button
              key={cat.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectCategory(cat.slug)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-shrink-0 group relative flex flex-col items-center justify-between p-3 sm:p-4 rounded-none transition-all duration-300 w-28 sm:w-32 md:w-36 text-center select-none ${
                isSelected
                  ? 'bg-charcoal text-ivory shadow-luxury border-2 border-gold ring-2 ring-gold/20'
                  : 'bg-white border border-sand/80 text-charcoal hover:border-gold/60 hover:shadow-card-hover'
              }`}
            >
              {/* Category Image Thumbnail with subtle gold rim */}
              <div
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2.5 transition-transform duration-500 border ${
                  isSelected
                    ? 'border-gold scale-105 shadow-gold-sm ring-2 ring-gold/30'
                    : 'border-sand group-hover:scale-105 group-hover:border-gold/40'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    if (cat.fallbackImage) e.currentTarget.src = cat.fallbackImage
                  }}
                  loading="lazy"
                />
                {/* Visual subtle overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isSelected ? 'bg-gold/10' : 'bg-charcoal/10 group-hover:bg-transparent'
                  }`}
                />
              </div>

              {/* Title */}
              <span
                className={`font-display text-sm sm:text-base font-medium tracking-wide transition-colors leading-tight line-clamp-1 mb-1 ${
                  isSelected ? 'text-gold' : 'text-charcoal group-hover:text-gold'
                }`}
              >
                {cat.name}
              </span>

              {/* Product Count Badge */}
              <span
                className={`font-body text-2xs px-2 py-0.5 rounded-full transition-colors ${
                  isSelected
                    ? 'bg-gold/25 text-gold-light font-semibold'
                    : 'bg-sand/60 text-charcoal/60 group-hover:bg-gold/15 group-hover:text-gold'
                }`}
              >
                {count} {count === 1 ? 'Item' : 'Items'}
              </span>

              {/* Active Indicator Bar */}
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gold rounded-full"
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
