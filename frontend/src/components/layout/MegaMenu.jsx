import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

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

  const { items, title, featured, byType = [], byKarat = [], viewAllHref = '/collection' } = data

  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute top-full left-1/2 -translate-x-1/2 z-50 mt-0 w-[580px] lg:w-[680px] bg-ivory border-t-2 border-gold shadow-luxury"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="menu"
    >
      {/* Top gold line accent */}
      <div className="gold-divider-full h-0.5" />

      {/* Modern items dropdown layout */}
      {items && items.length > 0 ? (
        <div className="grid grid-cols-12 gap-0">
          {/* Main items column (7 or 8 cols) */}
          <div className="col-span-7 p-6 sm:p-7 border-r border-sand">
            {title && (
              <p className="section-label mb-4">{title}</p>
            )}
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="flex items-center justify-between font-body text-xs sm:text-sm text-charcoal/80 hover:text-gold transition-all duration-300 group py-0.5"
                    role="menuitem"
                  >
                    <span className="flex items-center gap-2.5">
                      {/* Color dot if specified */}
                      {item.colorHex ? (
                        <span
                          className="w-3 h-3 rounded-full border border-sand shadow-2xs shrink-0"
                          style={{ background: item.colorHex }}
                        />
                      ) : (
                        <span className="w-2.5 h-px bg-charcoal/20 group-hover:w-4 group-hover:bg-gold transition-all duration-300" />
                      )}
                      <span>{item.label}</span>
                    </span>

                    {/* Badge if specified */}
                    {item.badge && (
                      <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-gold/15 text-gold-dark">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Right Column (5 cols) */}
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
      ) : (
        /* Legacy multi-type mega menu layout fallback */
        <div className="grid grid-cols-3 gap-0">
          {byType.length > 0 && (
            <div className="p-8 border-r border-sand">
              <p className="section-label mb-5">By Type</p>
              <ul className="space-y-2.5">
                {byType.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 font-body text-sm text-charcoal/70 hover:text-gold transition-all duration-300 group"
                      role="menuitem"
                    >
                      <span className="w-3 h-px bg-charcoal/20 group-hover:w-5 group-hover:bg-gold transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {byKarat.length > 0 && (
            <div className="p-8 border-r border-sand">
              <p className="section-label mb-5">By Purity</p>
              <ul className="space-y-2.5">
                {byKarat.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="flex items-center gap-2 font-body text-sm text-charcoal/70 hover:text-gold transition-all duration-300 group"
                      role="menuitem"
                    >
                      <span className="w-3 h-px bg-charcoal/20 group-hover:w-5 group-hover:bg-gold transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {featured && (
            <div className="p-6 bg-sand/40">
              <p className="section-label mb-4">Featured</p>
              <Link to={featured.href} className="block group" role="menuitem">
                <div className="relative overflow-hidden aspect-[4/3] mb-4">
                  <img
                    src={featured.image}
                    alt={featured.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {featured.badge && (
                    <span className="absolute top-2 left-2 badge-gold text-2xs">
                      {featured.badge}
                    </span>
                  )}
                </div>
                <p className="font-display text-base text-charcoal group-hover:text-gold transition-colors duration-300">
                  {featured.label}
                </p>
                <span className="inline-flex items-center gap-1 text-gold text-xs font-semibold tracking-wider mt-1 uppercase">
                  Shop Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          )}
        </div>
      )}

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
          Saradhya Jewels
        </span>
      </div>
    </motion.div>
  )
}
