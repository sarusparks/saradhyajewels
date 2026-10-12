import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react'
import { CATEGORIES } from '@/data/productsData'

const menuVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
}

export default function MegaMenu({ data, onMouseEnter, onMouseLeave }) {
  if (!data) return null

  const isCategoryMenu = data.type === 'categories' || data.title === 'Shop by Category'
  const [hoveredCatSlug, setHoveredCatSlug] = useState('necklaces')

  const { items, title, featured, viewAllHref = '/collection', twoColumn = false } = data

  const activeCategory = CATEGORIES.find((c) => c.slug === hoveredCatSlug) || CATEGORIES[0]

  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`absolute top-full left-1/2 -translate-x-1/2 z-50 mt-0 bg-ivory border-t-2 border-gold shadow-luxury ${
        isCategoryMenu
          ? 'w-[900px] lg:w-[960px] xl:w-[1020px]'
          : twoColumn
          ? 'w-[720px] lg:w-[820px]'
          : 'w-[580px] lg:w-[680px]'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menu"
    >
      {/* Top gold line accent */}
      <div className="gold-divider-full h-0.5" />

      {/* ── Category Menu with Subheadings on Hover (Like in Filters) ── */}
      {isCategoryMenu ? (
        <div className="grid grid-cols-12 gap-0">
          {/* Left Column: List of Categories */}
          <div className="col-span-5 p-5 border-r border-sand bg-sand/15">
            <div className="flex items-center justify-between mb-3 px-2">
              <p className="section-label">Categories</p>
              <span className="text-3xs text-charcoal/50 uppercase tracking-widest font-mono">
                Hover to explore
              </span>
            </div>

            <ul className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isHovered = hoveredCatSlug === cat.slug
                return (
                  <li key={cat.slug}>
                    <Link
                      to={`/collection?category=${cat.slug}`}
                      onMouseEnter={() => setHoveredCatSlug(cat.slug)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm font-body transition-all duration-200 group rounded border-l-2 ${
                        isHovered
                          ? 'bg-ivory text-gold font-semibold border-gold shadow-xs'
                          : 'text-charcoal/80 hover:text-gold hover:bg-ivory/60 border-transparent'
                      }`}
                      role="menuitem"
                    >
                      <span className="flex items-center gap-2.5 truncate">
                        <span className="text-base shrink-0">{cat.icon}</span>
                        <span className="truncate">{cat.name}</span>
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0 ml-1">
                        {cat.subcategories?.length > 0 && (
                          <span
                            className={`text-3xs px-1.5 py-0.5 rounded transition-colors ${
                              isHovered
                                ? 'bg-gold/20 text-gold-dark font-bold'
                                : 'bg-sand/60 text-charcoal/50'
                            }`}
                          >
                            {cat.subcategories.length}
                          </span>
                        )}
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isHovered ? 'text-gold translate-x-0.5' : 'text-charcoal/30'
                          }`}
                        />
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Right Column: Subheadings from Filters for Hovered Category */}
          <div className="col-span-7 p-6 sm:p-7 flex flex-col justify-between bg-sand/20">
            <div>
              {/* Active Category Header */}
              <div className="flex items-start justify-between pb-3.5 mb-4 border-b border-sand">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activeCategory.icon}</span>
                    <h3 className="font-display text-xl text-charcoal font-medium">
                      {activeCategory.name}
                    </h3>
                  </div>
                  <p className="text-2xs text-charcoal/60 mt-1 max-w-sm">
                    {activeCategory.description}
                  </p>
                </div>
                <Link
                  to={`/collection?category=${activeCategory.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-gold hover:text-gold-dark transition-colors shrink-0 pt-1"
                >
                  <span>All {activeCategory.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Subheadings list (Matches filters exactly) */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-2xs font-semibold uppercase tracking-widest text-charcoal/70 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>Subheadings / Styles in Filters ({activeCategory.subcategories?.length || 0})</span>
                  </p>
                  <span className="text-3xs text-charcoal/40 font-mono">
                    Filter by design
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {activeCategory.subcategories?.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/collection?category=${sub.slug}`}
                      className="group flex items-center justify-between py-1.5 px-2.5 rounded bg-ivory/60 hover:bg-ivory border border-transparent hover:border-gold/30 hover:shadow-2xs transition-all duration-200"
                      role="menuitem"
                    >
                      <span className="flex items-center gap-2 text-xs font-body text-charcoal/80 group-hover:text-gold transition-colors">
                        <span className="w-2 h-px bg-charcoal/30 group-hover:w-3.5 group-hover:bg-gold transition-all duration-200" />
                        <span className="group-hover:translate-x-0.5 transition-transform font-medium">
                          {sub.name}
                        </span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Card for Active Category */}
            <div className="mt-4 pt-3.5 border-t border-sand/60 bg-sand/30 p-3 flex items-center justify-between rounded">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 overflow-hidden rounded border border-sand bg-sand/50 shrink-0">
                  <img
                    src={activeCategory.image || activeCategory.fallbackImage}
                    alt={activeCategory.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 text-3xs font-semibold uppercase tracking-wider text-gold-dark">
                    <Sparkles className="w-2.5 h-2.5 text-gold" /> 1 Gram Micro Gold Plating
                  </span>
                  <p className="text-xs font-medium text-charcoal line-clamp-1">
                    Authentic Royal Look {activeCategory.name}
                  </p>
                  <p className="text-2xs text-charcoal/50">
                    500+ Designs · Real Gold Look at ₹299+
                  </p>
                </div>
              </div>
              <Link
                to={`/collection?category=${activeCategory.slug}`}
                className="px-3.5 py-1.5 bg-charcoal text-ivory text-xs font-semibold tracking-wider uppercase hover:bg-gold hover:text-charcoal transition-all shrink-0 ml-3"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      ) : items && items.length > 0 ? (
        /* ── Standard Dropdown (Rentals & Other Menus) ── */
        <div className="grid grid-cols-12 gap-0">
          <div className="col-span-7 p-6 sm:p-7 border-r border-sand">
            {title && <p className="section-label mb-4">{title}</p>}
            <ul className={twoColumn ? 'grid grid-cols-2 gap-x-4 gap-y-2' : 'space-y-2.5'}>
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="flex items-start justify-between font-body text-charcoal/80 hover:text-gold transition-all duration-300 group py-1"
                    role="menuitem"
                  >
                    <span className="flex items-start gap-2.5">
                      {item.colorHex ? (
                        <span
                          className="w-3 h-3 rounded-full border border-sand shadow-2xs shrink-0 mt-1"
                          style={{ background: item.colorHex }}
                        />
                      ) : (
                        <span className="w-2.5 h-px bg-charcoal/20 group-hover:w-4 group-hover:bg-gold transition-all duration-300 mt-2 shrink-0" />
                      )}
                      <span className="flex flex-col gap-0.5">
                        <span className="text-xs sm:text-sm leading-snug">{item.label}</span>
                        {item.sublabel && (
                          <span className="text-2xs text-charcoal/40 group-hover:text-gold/60 transition-colors duration-300 leading-tight tracking-wide">
                            {item.sublabel}
                          </span>
                        )}
                      </span>
                    </span>

                    {item.badge && (
                      <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-gold/15 text-gold-dark shrink-0 ml-1 mt-0.5">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {featured ? (
            <div className="col-span-5 p-6 bg-sand/35 flex flex-col justify-between">
              <div>
                <p className="section-label mb-3">Highlights</p>
                <Link to={featured.href} className="block group" role="menuitem">
                  <div className="relative overflow-hidden aspect-[4/3] mb-3 bg-sand/20 border border-sand/60">
                    <img
                      src={featured.image}
                      alt={featured.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {featured.badge && (
                      <span className="absolute top-2 left-2 badge-gold text-2xs shadow-xs font-semibold">
                        {featured.badge}
                      </span>
                    )}
                  </div>
                  <p className="font-display text-base text-charcoal group-hover:text-gold transition-colors duration-300 leading-snug">
                    {featured.label}
                  </p>
                  <span className="inline-flex items-center gap-1 text-gold text-xs font-semibold tracking-wider mt-1 uppercase">
                    Explore Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Bottom accent */}
      <div className="px-7 py-3 border-t border-sand bg-ivory/80 flex items-center justify-between">
        <Link
          to={viewAllHref}
          className="text-xs font-body font-semibold tracking-widest uppercase text-charcoal/50 hover:text-gold transition-colors duration-300 flex items-center gap-1.5"
        >
          <span>View All in Collection</span>
          <ArrowRight className="w-3 h-3 text-gold" />
        </Link>
        <span className="text-2xs text-gold/60 font-body uppercase tracking-widest font-medium">
          Saradhya Jewels · 1 Gram Gold Specialists
        </span>
      </div>
    </motion.div>
  )
}
