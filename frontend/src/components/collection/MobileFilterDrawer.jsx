import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, RotateCcw, Check } from 'lucide-react'
import { FILTER_OPTIONS, CATEGORIES } from '@/data/productsData'

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters,
  selectedCategory,
  activeFilterCount,
  filteredCount,
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleCheckboxToggle = (groupKey, value) => {
    const currentList = filters[groupKey] || []
    const updated = currentList.includes(value)
      ? currentList.filter((item) => item !== value)
      : [...currentList, value]
    onFilterChange(groupKey, updated)
  }

  const handlePricePreset = (min, max) => {
    onFilterChange('priceRange', { min, max })
  }

  const relevantSizes = selectedCategory !== 'all'
    ? FILTER_OPTIONS.sizesByCategory[selectedCategory] || null
    : null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-ivory flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-sand bg-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h3 className="font-display text-xl font-medium text-charcoal">Filter Products</h3>
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 text-2xs font-bold rounded-full bg-gold text-charcoal">
                    {activeFilterCount} Active
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-charcoal/70 hover:text-gold hover:bg-sand/40 transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 divide-y divide-sand/50">

              {/* ── Category ── */}
              <div>
                <h4 className="font-body text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
                  Jewellery Category
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.slug
                    return (
                      <button
                        key={cat.id}
                        onClick={() => onFilterChange('category', cat.slug)}
                        className={`p-2.5 text-xs text-left border transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-charcoal text-gold border-charcoal font-semibold'
                            : 'bg-white border-sand text-charcoal/80 hover:border-gold'
                        }`}
                      >
                        <span className="truncate">{cat.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-gold shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* ── Necklaces (Heading & Sub-Headings) ── */}
              <div className="pt-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-body text-xs font-bold uppercase tracking-wider text-charcoal">
                    Necklaces
                  </h4>
                  <span className="text-2xs font-semibold px-2 py-0.5 text-gold-dark bg-gold/15 rounded-full">
                    {(filters.necklaceTypes || []).length > 0
                      ? `${filters.necklaceTypes.length} Selected`
                      : 'Designs'}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {FILTER_OPTIONS.necklaceTypes.map((sub) => {
                    const isChecked = (filters.necklaceTypes || []).includes(sub.value)
                    return (
                      <label
                        key={sub.value}
                        className={`flex items-center justify-between p-2.5 text-xs border transition-all cursor-pointer select-none ${
                          isChecked
                            ? 'bg-gold/15 text-gold-dark font-semibold border-gold'
                            : 'bg-white border-sand text-charcoal/80 hover:border-gold'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleCheckboxToggle('necklaceTypes', sub.value)}
                            className="rounded-none border-sand text-gold focus:ring-gold focus:ring-1 h-3.5 w-3.5 accent-[#C9A227]"
                          />
                          <span className="truncate">{sub.label}</span>
                        </div>
                        {isChecked && <Check className="w-3.5 h-3.5 text-gold shrink-0" />}
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* ── Price Range ── */}
              <div className="pt-5">
                <h4 className="font-body text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
                  Price Range
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {FILTER_OPTIONS.priceRanges.map((range, idx) => {
                    const isSelected =
                      filters.priceRange.min === range.min && filters.priceRange.max === range.max
                    return (
                      <button
                        key={idx}
                        onClick={() => handlePricePreset(range.min, range.max)}
                        className={`p-2 text-xs text-left border transition-all ${
                          isSelected
                            ? 'bg-gold/20 text-gold-dark font-semibold border-gold'
                            : 'bg-white border-sand text-charcoal/80'
                        }`}
                      >
                        {range.label}
                      </button>
                    )
                  })}
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="number"
                    placeholder="Min ₹"
                    value={filters.priceRange.min || ''}
                    onChange={(e) =>
                      onFilterChange('priceRange', {
                        ...filters.priceRange,
                        min: Number(e.target.value) || 0,
                      })
                    }
                    className="w-1/2 p-2 text-xs border border-sand bg-white focus:border-gold focus:outline-none"
                  />
                  <span className="text-charcoal/40">–</span>
                  <input
                    type="number"
                    placeholder="Max ₹"
                    value={filters.priceRange.max === Infinity ? '' : filters.priceRange.max || ''}
                    onChange={(e) =>
                      onFilterChange('priceRange', {
                        ...filters.priceRange,
                        max: e.target.value ? Number(e.target.value) : Infinity,
                      })
                    }
                    className="w-1/2 p-2 text-xs border border-sand bg-white focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* ── Category-Specific Sizes ── */}
              {relevantSizes && relevantSizes.length > 0 && (
                <div className="pt-5">
                  <h4 className="font-body text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
                    {selectedCategory.slice(0, 1).toUpperCase() + selectedCategory.slice(1)} Size
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {relevantSizes.map((s) => {
                      const isSelected = (filters.sizes || []).includes(s.value)
                      return (
                        <button
                          key={s.value}
                          onClick={() => handleCheckboxToggle('sizes', s.value)}
                          className={`px-3 py-2 text-xs font-medium border transition-all ${
                            isSelected
                              ? 'bg-charcoal text-gold border-charcoal font-semibold'
                              : 'bg-white border-sand text-charcoal/80'
                          }`}
                        >
                          {s.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* ── Availability ── */}
              <div className="pt-5">
                <h4 className="font-body text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
                  Availability
                </h4>
                <div className="space-y-2">
                  {FILTER_OPTIONS.availability.map((avail) => {
                    const isChecked = (filters.availability || []).includes(avail.value)
                    return (
                      <label
                        key={avail.value}
                        className="flex items-center gap-2.5 p-2 bg-white border border-sand text-xs text-charcoal cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleCheckboxToggle('availability', avail.value)}
                          className="h-4 w-4 text-gold border-sand focus:ring-gold"
                        />
                        <span>{avail.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* ── Discounts ── */}
              <div className="pt-5">
                <h4 className="font-body text-xs font-bold uppercase tracking-wider text-charcoal mb-3">
                  Special Offers
                </h4>
                <div className="space-y-2">
                  {FILTER_OPTIONS.discounts.map((disc) => {
                    const isChecked = filters.discount === disc.value
                    return (
                      <label
                        key={disc.value}
                        className="flex items-center gap-2.5 p-2 bg-white border border-sand text-xs text-charcoal cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="discount-filter-mobile"
                          checked={isChecked}
                          onChange={() => onFilterChange('discount', isChecked ? null : disc.value)}
                          className="h-4 w-4 text-gold border-sand focus:ring-gold"
                        />
                        <span>{disc.label}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="p-4 bg-white border-t border-sand flex items-center gap-3">
              <button
                onClick={onResetFilters}
                className="py-3 px-4 border border-sand text-charcoal font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-sand/30 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-charcoal text-ivory font-semibold text-xs tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-colors shadow-luxury-sm"
              >
                Apply ({filteredCount} Items)
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
