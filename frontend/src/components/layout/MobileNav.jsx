import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, Instagram, ChevronRight, ChevronDown } from 'lucide-react'
import { useUIStore } from '@/store'
import { NAV_LINKS, BRAND } from '@/utils/constants'
import { CATEGORIES } from '@/data/productsData'

const drawerVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: '-100%', opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

export default function MobileNav() {
  const { isMobileNavOpen, closeMobileNav } = useUIStore()
  const [isCollectionExpanded, setIsCollectionExpanded] = useState(false)
  const [expandedCat, setExpandedCat] = useState(null)

  // Lock body scroll when open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileNavOpen])

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-charcoal/60 backdrop-blur-sm lg:hidden"
            onClick={closeMobileNav}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-ivory flex flex-col lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-sand">
              <Link to="/" onClick={closeMobileNav} className="flex flex-col">
                <span className="font-display text-2xl font-light text-charcoal">Saradhya</span>
                <span className="font-body text-2xs tracking-widest-3 text-gold uppercase">Jewels</span>
              </Link>
              <button
                onClick={closeMobileNav}
                className="btn-icon"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-1" aria-label="Mobile navigation">
              {/* Collection with subcategories accordion */}
              <div className="border-b border-sand/60 pb-1">
                <div className="flex items-center justify-between py-3">
                  <NavLink
                    to="/collection"
                    onClick={closeMobileNav}
                    className="font-body text-base font-medium text-charcoal hover:text-gold transition-colors"
                  >
                    Collection
                  </NavLink>
                  <button
                    onClick={() => setIsCollectionExpanded((v) => !v)}
                    className="p-1 text-gold hover:text-gold-dark"
                    aria-label="Toggle collection categories"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isCollectionExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Categories & Subcategories accordion */}
                <AnimatePresence>
                  {isCollectionExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pl-3 pb-2 space-y-1"
                    >
                      {CATEGORIES.map((cat) => {
                        const isCatOpen = expandedCat === cat.slug
                        return (
                          <div key={cat.slug} className="border-l border-sand/70 pl-2.5 py-1">
                            <div className="flex items-center justify-between py-1">
                              <Link
                                to={`/collection?category=${cat.slug}`}
                                onClick={closeMobileNav}
                                className="flex items-center gap-2 text-xs font-medium text-charcoal/80 hover:text-gold"
                              >
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                              </Link>
                              {cat.subcategories?.length > 0 && (
                                <button
                                  onClick={() => setExpandedCat(isCatOpen ? null : cat.slug)}
                                  className="p-1 text-charcoal/40 hover:text-gold"
                                >
                                  <ChevronDown
                                    className={`w-3 h-3 transition-transform duration-200 ${
                                      isCatOpen ? 'rotate-180 text-gold' : ''
                                    }`}
                                  />
                                </button>
                              )}
                            </div>

                            {/* Subcategories (like in filters) */}
                            {isCatOpen && cat.subcategories?.length > 0 && (
                              <div className="pl-5 py-1 space-y-1 bg-sand/20 rounded mt-1">
                                {cat.subcategories.map((sub) => (
                                  <Link
                                    key={sub.id}
                                    to={`/collection?category=${sub.slug}`}
                                    onClick={closeMobileNav}
                                    className="block text-2xs text-charcoal/70 hover:text-gold py-0.5"
                                  >
                                    • {sub.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Rentals link */}
              <NavLink
                to="/rentals"
                onClick={closeMobileNav}
                className={({ isActive }) =>
                  `flex items-center justify-between w-full py-4 border-b border-sand/60 font-body text-base font-medium transition-colors duration-300 ${
                    isActive ? 'text-gold' : 'text-charcoal hover:text-gold'
                  }`
                }
              >
                <span>Rentals</span>
                <ChevronRight className="w-4 h-4 text-gold/60" />
              </NavLink>

              {/* Quick links */}
              <div className="pt-6 pb-4">
                <p className="section-label mb-4">Quick Links</p>
                <div className="space-y-3">
                  {[
                    { label: 'Jewellery Rentals', href: '/rentals' },
                    { label: 'My Account / Sign In', href: '/profile' },
                    { label: 'Wedding Collections', href: '/bridal' },
                    { label: 'Festival Specials', href: '/occasion/festive' },
                    { label: 'Gold Rate Today', href: '/gold-rates' },
                    { label: 'Custom Order', href: '/custom-order' },
                  ].map((l) => (
                    <Link
                      key={l.href}
                      to={l.href}
                      onClick={closeMobileNav}
                      className="block font-body text-sm text-charcoal/60 hover:text-gold transition-colors duration-300"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-sand bg-sand/30">
              <div className="flex items-center gap-3 mb-4">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-2 text-sm text-charcoal/70 hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  {BRAND.phone}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center bg-charcoal text-ivory text-xs font-semibold tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all duration-300"
                >
                  WhatsApp Us
                </a>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-sand text-charcoal hover:text-gold hover:border-gold transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
