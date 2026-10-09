import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, RotateCcw, Check } from 'lucide-react'
import { FILTER_OPTIONS, CATEGORIES } from '@/data/productsData'

export default function FilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  selectedCategory,
  activeFilterCount = 0,
}) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    sizes: true,
    availability: true,
    discounts: false,
  })

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePricePreset = (min, max) => {
    onFilterChange('priceRange', { min, max })
  }

  const handleCheckboxToggle = (groupKey, value) => {
    const currentList = filters[groupKey] || []
    const updated = currentList.includes(value)
      ? currentList.filter((item) => item !== value)
      : [...currentList, value]
    onFilterChange(groupKey, updated)
  }

  // Show sizes only when a specific (non-all) category with sizes is selected
  const relevantSizes = selectedCategory !== 'all'
    ? FILTER_OPTIONS.sizesByCategory[selectedCategory] || null
    : null

  return (
    <aside
      className="w-full bg-white border border-sand/70 p-5 shadow-luxury-xs divide-y divide-sand/50"
      aria-label="Filter products"
    >
      {/* ── Header ── */}
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-medium text-charcoal">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-2xs font-bold rounded-full bg-gold text-charcoal">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-2xs font-semibold uppercase tracking-wider text-charcoal/60 hover:text-gold transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {/* ── 1. Category ── */}
      <FilterSection
        title="Category"
        isOpen={openSections.categories}
        onToggle={() => toggleSection('categories')}
      >
        <div className="space-y-0.5 max-h-80 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => {
            const isParentSelected = selectedCategory === cat.slug
            const isSubSelected = cat.subcategories?.some((sub) => sub.slug === selectedCategory)
            const isExpanded = isParentSelected || isSubSelected

            return (
              <div key={cat.id} className="border-b border-sand/30 last:border-0 pb-0.5 mb-0.5">
                {/* Parent Category Button */}
                <button
                  onClick={() => onFilterChange('category', cat.slug)}
                  className={`w-full flex items-center justify-between py-1.5 px-2 text-xs transition-colors rounded-none text-left ${
                    isParentSelected
                      ? 'bg-charcoal text-gold font-semibold'
                      : isSubSelected
                      ? 'text-charcoal font-medium bg-sand/30'
                      : 'text-charcoal/80 hover:bg-sand/40 hover:text-charcoal'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-sm shrink-0">{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </span>
                  <div className="flex items-center gap-1 shrink-0 ml-1">
                    {isParentSelected && <Check className="w-3 h-3 text-gold" />}
                    {cat.subcategories?.length > 0 && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-gold' : 'text-charcoal/40'
                        }`}
                      />
                    )}
                  </div>
                </button>

                {/* Sub-categories (shown when parent or sub is selected) */}
                {isExpanded && cat.subcategories?.length > 0 && (
                  <div className="pl-5 pt-0.5 pb-1 space-y-0.5">
                    {cat.subcategories.map((sub) => {
                      const isSubActive = selectedCategory === sub.slug
                      return (
                        <button
                          key={sub.id}
                          onClick={() => onFilterChange('category', sub.slug)}
                          className={`w-full flex items-center justify-between py-1 px-2 text-xs transition-colors rounded-none text-left ${
                            isSubActive
                              ? 'text-gold font-semibold'
                              : 'text-charcoal/60 hover:text-gold hover:bg-sand/20'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-px bg-charcoal/20 shrink-0" />
                            <span>{sub.name}</span>
                          </span>
                          {isSubActive && <Check className="w-3 h-3 text-gold shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </FilterSection>


      {/* ── 2. Price Range ── */}
      <FilterSection
        title="Price"
        isOpen={openSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-3">
          <div className="space-y-1.5">
            {FILTER_OPTIONS.priceRanges.map((range, idx) => {
              const isSelected =
                filters.priceRange.min === range.min && filters.priceRange.max === range.max
              return (
                <button
                  key={idx}
                  onClick={() => handlePricePreset(range.min, range.max)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-gold/15 text-gold-dark font-semibold border-l-2 border-gold'
                      : 'text-charcoal/70 hover:bg-sand/30'
                  }`}
                >
                  <span>{range.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
                </button>
              )
            })}
          </div>

          {/* Custom min-max inputs */}
          <div className="pt-2 border-t border-sand/40">
            <span className="block text-2xs uppercase tracking-wider text-charcoal/50 mb-1.5 font-medium">
              Custom Range (₹)
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min || ''}
                onChange={(e) =>
                  onFilterChange('priceRange', {
                    ...filters.priceRange,
                    min: Number(e.target.value) || 0,
                  })
                }
                className="w-1/2 px-2 py-1.5 text-xs border border-sand bg-ivory focus:border-gold focus:outline-none"
              />
              <span className="text-charcoal/40 text-xs">–</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max === Infinity ? '' : filters.priceRange.max || ''}
                onChange={(e) =>
                  onFilterChange('priceRange', {
                    ...filters.priceRange,
                    max: e.target.value ? Number(e.target.value) : Infinity,
                  })
                }
                className="w-1/2 px-2 py-1.5 text-xs border border-sand bg-ivory focus:border-gold focus:outline-none"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* ── 3. Size (shown only when a specific category is selected) ── */}
      {relevantSizes && relevantSizes.length > 0 && (
        <FilterSection
          title={`${selectedCategory.slice(0, 1).toUpperCase() + selectedCategory.slice(1)} Size`}
          isOpen={openSections.sizes}
          onToggle={() => toggleSection('sizes')}
          badge="Category Specific"
        >
          <div className="flex flex-wrap gap-2">
            {relevantSizes.map((s) => {
              const isSelected = (filters.sizes || []).includes(s.value)
              return (
                <button
                  key={s.value}
                  onClick={() => handleCheckboxToggle('sizes', s.value)}
                  className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-charcoal text-gold border-charcoal font-semibold'
                      : 'border-sand bg-ivory/60 text-charcoal/80 hover:border-gold hover:text-gold'
                  }`}
                >
                  {s.label}
                </button>
              )
            })}
          </div>
        </FilterSection>
      )}

      {/* ── 4. Availability ── */}
      <FilterSection
        title="Availability"
        isOpen={openSections.availability}
        onToggle={() => toggleSection('availability')}
      >
        <div className="space-y-2">
          {FILTER_OPTIONS.availability.map((avail) => {
            const isChecked = (filters.availability || []).includes(avail.value)
            return (
              <label
                key={avail.value}
                className="flex items-center gap-2.5 text-xs text-charcoal/80 hover:text-gold cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxToggle('availability', avail.value)}
                  className="rounded-none border-sand text-gold focus:ring-gold focus:ring-1 h-3.5 w-3.5"
                />
                <span>{avail.label}</span>
              </label>
            )
          })}
        </div>
      </FilterSection>

      {/* ── 5. Discounts ── */}
      <FilterSection
        title="Special Offers & Discounts"
        isOpen={openSections.discounts}
        onToggle={() => toggleSection('discounts')}
      >
        <div className="space-y-2">
          {FILTER_OPTIONS.discounts.map((disc) => {
            const isChecked = filters.discount === disc.value
            return (
              <label
                key={disc.value}
                className="flex items-center gap-2.5 text-xs text-charcoal/80 hover:text-gold cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="discount-filter"
                  checked={isChecked}
                  onChange={() => onFilterChange('discount', isChecked ? null : disc.value)}
                  className="rounded-full border-sand text-gold focus:ring-gold focus:ring-1 h-3.5 w-3.5"
                />
                <span>{disc.label}</span>
              </label>
            )
          })}
        </div>
      </FilterSection>
    </aside>
  )
}

function FilterSection({ title, isOpen, onToggle, children, badge }) {
  return (
    <div className="py-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <span className="font-body text-xs font-semibold uppercase tracking-wider text-charcoal group-hover:text-gold transition-colors">
            {title}
          </span>
          {badge && (
            <span className="text-2xs font-semibold px-1.5 py-0.5 text-gold bg-gold/10 rounded">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-charcoal/50 group-hover:text-gold transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-gold' : ''
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden pt-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
