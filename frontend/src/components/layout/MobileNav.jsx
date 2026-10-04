import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, Mail, Instagram, ChevronRight } from 'lucide-react'
import { useUIStore } from '@/store'
import { NAV_LINKS, BRAND } from '@/utils/constants'

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
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.href}
                  onClick={closeMobileNav}
                  className={({ isActive }) =>
                    `flex items-center justify-between w-full py-4 border-b border-sand/60 font-body text-base font-medium transition-colors duration-300 ${
                      isActive ? 'text-gold' : 'text-charcoal hover:text-gold'
                    }`
                  }
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 text-gold/60" />
                </NavLink>
              ))}

              {/* Quick links */}
              <div className="pt-6 pb-4">
                <p className="section-label mb-4">Quick Links</p>
                <div className="space-y-3">
                  {[
                    { label: 'Wedding Collections', href: '/bridal' },
                    { label: 'Festival Specials', href: '/occasion/festive' },
                    { label: 'Gold Rate Today', href: '/gold-rates' },
                    { label: 'Custom Order', href: '/custom-order' },
                    { label: 'My Orders', href: '/orders' },
                    { label: 'Track Order', href: '/track' },
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
