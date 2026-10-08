import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  RotateCcw,
  Sparkles,
  Search,
  Grid3X3,
  LayoutGrid,
  ChevronRight,
  ShieldCheck,
  Check,
} from 'lucide-react'

import { ALL_PRODUCTS, CATEGORIES, SORT_OPTIONS, FILTER_OPTIONS } from '@/data/productsData'
import CategoryTiles from '@/components/collection/CategoryTiles'
import FilterSidebar from '@/components/collection/FilterSidebar'
import MobileFilterDrawer from '@/components/collection/MobileFilterDrawer'
import ProductCard from '@/components/collection/ProductCard'
import QuickViewModal from '@/components/collection/QuickViewModal'
import { formatINR } from '@/utils/currency'

export default function CollectionPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Read initial category from URL search params (e.g. ?category=earrings) or default to 'all'
  const initialCategory = searchParams.get('category') || 'all'
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  // Filters state
  const [filters, setFilters] = useState({
    necklaceTypes: [],
    materials: [],
    gemstones: [],
    colours: [],
    occasions: [],
    styles: [],
    availability: [],
    sizes: [],
    discount: null,
    priceRange: { min: 0, max: Infinity },
  })

  // Sorting state
  const [sortBy, setSortBy] = useState('featured')
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)

  // Mobile drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Quick view state
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  // Grid density toggle for desktop (3 columns vs 4 columns)
  const [gridCols, setGridCols] = useState(3)

  // Loading state simulation for smooth feedback
  const [isLoading, setIsLoading] = useState(false)

  // Sync state with URL search params whenever location/searchParams change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all'
    setSelectedCategory(cat)

    const necklaceTypeParam = searchParams.getAll('necklaceType')
    const singleNecklaceType = searchParams.get('necklaceType')
    const initialNecklaceTypes = necklaceTypeParam.length > 0
      ? necklaceTypeParam
      : (singleNecklaceType ? [singleNecklaceType] : [])

    const materialParam = searchParams.get('material')
    const gemstoneParam = searchParams.get('gemstone')
    const colourParam = searchParams.get('colour')
    const occasionParam = searchParams.get('occasion')
    const styleParam = searchParams.get('style')

    setFilters((prev) => ({
      ...prev,
      necklaceTypes: initialNecklaceTypes.length > 0 ? initialNecklaceTypes : prev.necklaceTypes,
      materials: materialParam ? [materialParam] : prev.materials,
      gemstones: gemstoneParam ? [gemstoneParam] : prev.gemstones,
      colours: colourParam ? [colourParam] : prev.colours,
      occasions: occasionParam ? [occasionParam] : prev.occasions,
      styles: styleParam ? [styleParam] : prev.styles,
    }))
  }, [searchParams])

  // Sync category changes with URL search params
  const handleSelectCategory = (catSlug) => {
    setIsLoading(true)
    setSelectedCategory(catSlug)
    const newParams = new URLSearchParams(searchParams)
    if (catSlug === 'all') {
      newParams.delete('category')
    } else {
      newParams.set('category', catSlug)
    }
    setSearchParams(newParams, { replace: true })

    // If changing category, reset category-specific size filter if not compatible
    setFilters((prev) => ({
      ...prev,
      sizes: [],
    }))

    setTimeout(() => setIsLoading(false), 200)
  }

  // Handle individual filter updates
  const handleFilterChange = (key, value) => {
    setIsLoading(true)
    if (key === 'category') {
      handleSelectCategory(value)
      return
    }
    if (key === 'necklaceTypes' && Array.isArray(value) && value.length > 0 && selectedCategory !== 'necklaces' && selectedCategory !== 'all') {
      setSelectedCategory('necklaces')
      const newParams = new URLSearchParams(searchParams)
      newParams.set('category', 'necklaces')
      setSearchParams(newParams, { replace: true })
    }
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
    setTimeout(() => setIsLoading(false), 150)
  }

  // Reset all filters (preserves selected category or resets to all)
  const handleResetFilters = () => {
    setIsLoading(true)
    setFilters({
      necklaceTypes: [],
      materials: [],
      gemstones: [],
      colours: [],
      occasions: [],
      styles: [],
      availability: [],
      sizes: [],
      discount: null,
      priceRange: { min: 0, max: Infinity },
    })
    setTimeout(() => setIsLoading(false), 150)
  }

  // Remove single active filter chip
  const removeFilterChip = (type, value) => {
    if (type === 'priceRange') {
      setFilters((prev) => ({ ...prev, priceRange: { min: 0, max: Infinity } }))
    } else if (type === 'discount') {
      setFilters((prev) => ({ ...prev, discount: null }))
    } else if (type === 'category') {
      handleSelectCategory('all')
    } else if (Array.isArray(filters[type])) {
      setFilters((prev) => ({
        ...prev,
        [type]: prev[type].filter((item) => item !== value),
      }))
    }
  }

  // Compute category counts for tiles
  const categoryCounts = useMemo(() => {
    const counts = { all: ALL_PRODUCTS.length }
    CATEGORIES.forEach((cat) => {
      if (cat.slug !== 'all') {
        counts[cat.slug] = ALL_PRODUCTS.filter((p) => p.category === cat.slug).length
      }
    })
    return counts
  }, [])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS]

    // 1. Category Filter
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // 2. Necklaces Sub-Heading Filter (Short necklaces, Long harams, etc.)
    if (filters.necklaceTypes && filters.necklaceTypes.length > 0) {
      result = result.filter((p) => {
        if (p.category !== 'necklaces') return false
        const types = Array.isArray(p.necklaceTypes) ? p.necklaceTypes : []
        return filters.necklaceTypes.some((t) => types.includes(t))
      })
    }

    // 3. Price Range Filter
    const { min, max } = filters.priceRange
    if (min > 0 || max < Infinity) {
      result = result.filter((p) => p.price >= min && p.price <= max)
    }

    // 4. Materials Filter
    if (filters.materials.length > 0) {
      result = result.filter((p) => filters.materials.includes(p.materialGroup))
    }

    // 5. Gemstones Filter
    if (filters.gemstones.length > 0) {
      result = result.filter((p) => filters.gemstones.includes(p.gemstone))
    }

    // 6. Colours Filter
    if (filters.colours.length > 0) {
      result = result.filter((p) => filters.colours.includes(p.colour))
    }

    // 7. Occasions Filter
    if (filters.occasions.length > 0) {
      result = result.filter((p) => filters.occasions.includes(p.occasion))
    }

    // 8. Styles Filter
    if (filters.styles.length > 0) {
      result = result.filter((p) => filters.styles.includes(p.style))
    }

    // 9. Availability Filter
    if (filters.availability.length > 0) {
      result = result.filter((p) => filters.availability.includes(p.availability))
    }

    // 10. Sizes Filter
    if (filters.sizes.length > 0) {
      result = result.filter(
        (p) => p.sizes && p.sizes.some((sz) => filters.sizes.includes(sz))
      )
    }

    // 11. Discount Filter
    if (filters.discount) {
      if (filters.discount === 'any') {
        result = result.filter((p) => p.discount > 0)
      } else {
        const minDisc = Number(filters.discount)
        result = result.filter((p) => p.discount >= minDisc)
      }
    }

    // ── Sorting ──
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'featured':
      default:
        // Keep natural curated ranking
        break
    }

    return result
  }, [selectedCategory, filters, sortBy])

  // Count active filters (excluding category, since category is prominent in tiles)
  const activeFilterChips = useMemo(() => {
    const chips = []

    if (filters.priceRange.min > 0 || filters.priceRange.max < Infinity) {
      const maxLabel =
        filters.priceRange.max === Infinity ? '+' : ` - ${formatINR(filters.priceRange.max)}`
      chips.push({
        type: 'priceRange',
        label: `${formatINR(filters.priceRange.min)}${maxLabel}`,
      })
    }

    (filters.necklaceTypes || []).forEach((nt) =>
      chips.push({ type: 'necklaceTypes', value: nt, label: nt })
    )
    filters.materials.forEach((m) => chips.push({ type: 'materials', value: m, label: m }))
    filters.gemstones.forEach((g) => chips.push({ type: 'gemstones', value: g, label: g }))
    filters.colours.forEach((c) => chips.push({ type: 'colours', value: c, label: c }))
    filters.occasions.forEach((o) => chips.push({ type: 'occasions', value: o, label: o }))
    filters.styles.forEach((s) => chips.push({ type: 'styles', value: s, label: s }))
    filters.availability.forEach((a) => chips.push({ type: 'availability', value: a, label: a }))
    filters.sizes.forEach((sz) => chips.push({ type: 'sizes', value: sz, label: `Size: ${sz}` }))

    if (filters.discount) {
      chips.push({
        type: 'discount',
        label: filters.discount === 'any' ? 'Special Discount' : `${filters.discount}%+ Off`,
      })
    }

    return chips
  }, [filters])

  const totalActiveFilterCount = activeFilterChips.length

  const currentCategoryData = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === selectedCategory) || CATEGORIES[0]
  }, [selectedCategory])

  return (
    <div className="bg-ivory min-h-screen pb-20">
      {/* ── Page Header & Hero Banner ── */}
      <section className="bg-gradient-to-b from-sand/50 via-ivory to-ivory border-b border-sand/70 pt-8 pb-8 sm:pt-12 sm:pb-12 px-4 lg:px-8">
        <div className="max-w-screen-xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-body text-charcoal/60">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-gold/60" />
              </li>
              <li>
                <button
                  onClick={() => handleSelectCategory('all')}
                  className={`hover:text-gold transition-colors ${
                    selectedCategory === 'all' ? 'text-charcoal font-semibold' : ''
                  }`}
                >
                  Jewellery Collection
                </button>
              </li>
              {selectedCategory !== 'all' && (
                <>
                  <li>
                    <ChevronRight className="w-3 h-3 text-gold/60" />
                  </li>
                  <li className="text-gold font-semibold truncate max-w-xs">
                    {currentCategoryData.name}
                  </li>
                </>
              )}
            </ol>
          </nav>

          {/* Title & Count Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="section-label">Heirloom Craftsmanship</span>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-charcoal tracking-wide leading-tight">
                Jewellery <span className="text-gold-gradient italic">Collection</span>
              </h1>
              <p className="font-body text-xs sm:text-sm text-charcoal/70 mt-2 max-w-2xl leading-relaxed">
                {currentCategoryData.description}
              </p>
            </div>

            {/* Product Count Pill & Trust Badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-sand shadow-xs text-xs font-body font-medium text-charcoal">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                <span>
                  Showing <strong className="font-bold text-charcoal">{filteredProducts.length}</strong>{' '}
                  {filteredProducts.length === 1 ? 'Design' : 'Designs'}
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-sand/30 border border-sand text-2xs font-body text-charcoal/70">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>100% Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <main className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-8">
        {/* Visual Category Tiles (Horizontally scrollable on mobile) */}
        <CategoryTiles
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          categoryCounts={categoryCounts}
        />

        {/* ── Mobile Sticky Filter & Sort Bar ── */}
        <div className="lg:hidden sticky top-18 z-30 -mx-4 px-4 py-2.5 bg-ivory/95 backdrop-blur-md border-y border-sand/80 shadow-xs mb-6">
          <div className="flex items-center gap-2">
            {/* Filter Trigger Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-wider shadow-xs hover:bg-gold hover:text-charcoal transition-colors"
              aria-label="Open filter menu"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
              <span>Filters</span>
              {totalActiveFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-gold text-charcoal text-2xs font-bold flex items-center justify-center ml-1">
                  {totalActiveFilterCount}
                </span>
              )}
            </button>

            {/* Sort Selector */}
            <div className="relative flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none py-2.5 pl-3 pr-8 bg-white border border-sand text-xs font-medium text-charcoal focus:outline-none focus:border-gold"
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    Sort: {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-charcoal/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Active chips row for mobile */}
          {activeFilterChips.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2">
              <button
                onClick={handleResetFilters}
                className="px-2 py-1 text-2xs font-semibold text-rose-gold whitespace-nowrap uppercase tracking-wider"
              >
                Clear ({activeFilterChips.length})
              </button>
              {activeFilterChips.map((chip, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-2xs bg-white border border-gold/40 text-charcoal whitespace-nowrap shadow-2xs"
                >
                  <span>{chip.label}</span>
                  <button
                    onClick={() => removeFilterChip(chip.type, chip.value)}
                    className="text-charcoal/50 hover:text-gold"
                    aria-label={`Remove filter ${chip.label}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Desktop Controls & Active Chips Row ── */}
        <div className="hidden lg:flex items-center justify-between gap-4 pb-5 border-b border-sand/60 mb-6">
          {/* Active Chips on Desktop */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            <span className="font-body text-xs font-medium text-charcoal/50 mr-1">
              {activeFilterChips.length > 0 ? 'Active Filters:' : 'All Designs'}
            </span>

            {activeFilterChips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-white border border-gold/50 text-charcoal shadow-2xs group"
              >
                <span className="font-medium">{chip.label}</span>
                <button
                  onClick={() => removeFilterChip(chip.type, chip.value)}
                  className="text-charcoal/40 group-hover:text-gold transition-colors"
                  aria-label={`Remove filter ${chip.label}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}

            {activeFilterChips.length > 0 && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-charcoal/60 hover:text-gold transition-colors ml-2 uppercase tracking-wider"
              >
                <RotateCcw className="w-3 h-3" />
                Clear All
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Grid Density */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Grid density toggle */}
            <div className="flex items-center border border-sand bg-white p-0.5">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 transition-colors ${
                  gridCols === 3 ? 'bg-charcoal text-gold shadow-2xs' : 'text-charcoal/50 hover:text-charcoal'
                }`}
                title="3 columns grid"
                aria-label="3 columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 transition-colors ${
                  gridCols === 4 ? 'bg-charcoal text-gold shadow-2xs' : 'text-charcoal/50 hover:text-charcoal'
                }`}
                title="4 columns grid"
                aria-label="4 columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Custom Sort Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="font-body text-xs text-charcoal/50 uppercase tracking-wider font-semibold">
                  Sort By:
                </span>
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 bg-white border border-sand text-xs font-semibold text-charcoal hover:border-gold transition-colors min-w-[170px] justify-between"
                  aria-haspopup="listbox"
                  aria-expanded={isSortDropdownOpen}
                >
                  <span>{SORT_OPTIONS.find((s) => s.id === sortBy)?.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-charcoal/50 transition-transform duration-200 ${
                      isSortDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isSortDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsSortDropdownOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-1 w-52 bg-white border border-sand shadow-luxury z-40 py-1.5"
                      role="listbox"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSortBy(opt.id)
                            setIsSortDropdownOpen(false)
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2 text-xs text-left transition-colors ${
                            sortBy === opt.id
                              ? 'bg-gold/15 text-gold-dark font-semibold'
                              : 'text-charcoal hover:bg-sand/30'
                          }`}
                          role="option"
                          aria-selected={sortBy === opt.id}
                        >
                          <span>{opt.label}</span>
                          {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-gold-dark" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Main Layout: Sidebar on Left, Grid on Right ── */}
        <div className="flex gap-8 items-start">
          {/* Desktop Left Sidebar */}
          <div className="hidden lg:block w-72 shrink-0 sticky top-24">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              selectedCategory={selectedCategory}
              activeFilterCount={totalActiveFilterCount}
            />
          </div>

          {/* Product Grid Area */}
          <div className="flex-1 w-full min-w-0">
            {isLoading ? (
              /* Loading Skeleton State */
              <div
                className={`grid grid-cols-2 ${
                  gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                } gap-4 sm:gap-6`}
              >
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white border border-sand/70 p-4 animate-pulse">
                    <div className="aspect-[4/5] bg-sand/40 mb-3" />
                    <div className="h-3 bg-sand/60 w-1/3 mb-2" />
                    <div className="h-4 bg-sand/80 w-3/4 mb-3" />
                    <div className="h-4 bg-sand/60 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              /* Products Grid: 2 per row on mobile, 3 or 4 on desktop */
              <motion.div
                layout
                className={`grid grid-cols-2 ${
                  gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
                } gap-3 sm:gap-6`}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Helpful Empty Results State */
              <div className="text-center py-20 px-4 bg-white border border-sand my-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sand/40 flex items-center justify-center text-gold">
                  <Search className="w-8 h-8 stroke-1 text-gold" />
                </div>
                <h3 className="font-display text-2xl font-light text-charcoal mb-2">
                  No Jewellery Matched Your Criteria
                </h3>
                <p className="font-body text-xs sm:text-sm text-charcoal/60 max-w-md mx-auto mb-6 leading-relaxed">
                  We couldn't find any designs matching the active filter combination. Try adjusting
                  your budget range, metal purity, or removing specific size filters.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="btn-primary"
                  >
                    Clear All Filters
                  </button>
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => handleSelectCategory('all')}
                      className="btn-outline-gold"
                    >
                      View All Jewellery
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Bottom Hallmarking & Trust Note */}
            {filteredProducts.length > 0 && (
              <div className="mt-14 pt-8 border-t border-sand/70 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-full bg-sand/50 text-gold shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-medium text-charcoal">BIS 916 Hallmarked</h4>
                    <p className="font-body text-2xs text-charcoal/60 mt-0.5">
                      Government recognized authenticity laser engraved on every gold jewellery piece.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-full bg-sand/50 text-gold shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-medium text-charcoal">Free Insured Transit</h4>
                    <p className="font-body text-2xs text-charcoal/60 mt-0.5">
                      Tamper-evident packaging delivered straight to your doorstep across India.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-full bg-sand/50 text-gold shrink-0">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-medium text-charcoal">Lifetime Exchange</h4>
                    <p className="font-body text-2xs text-charcoal/60 mt-0.5">
                      Transparent gold and diamond valuation with standard industry exchange policies.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Mobile Filter Drawer Component ── */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        selectedCategory={selectedCategory}
        activeFilterCount={totalActiveFilterCount}
        filteredCount={filteredProducts.length}
      />

      {/* ── Quick View Modal ── */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  )
}
