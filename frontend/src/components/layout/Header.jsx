import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Heart, ShoppingBag, User, Menu, X, Phone, ChevronDown
} from 'lucide-react'
import { useCartStore, useUIStore, useWishlistStore, useAuthStore } from '@/store'
import { NAV_LINKS } from '@/utils/constants'
import MegaMenu from './MegaMenu'
import MobileNav from './MobileNav'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null)
  const [menuTimeout, setMenuTimeout] = useState(null)
  const location = useLocation()

  const { items: cartItems, totalItems } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { openCart, openSearch, openMobileNav, isMobileNavOpen } = useUIStore()
  const { user, isAuthenticated } = useAuthStore()

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)
  const wishlistCount = wishlistItems.length

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => { setActiveMenu(null) }, [location.pathname])

  const handleMenuEnter = (id) => {
    if (menuTimeout) clearTimeout(menuTimeout)
    setActiveMenu(id)
  }

  const handleMenuLeave = () => {
    const t = setTimeout(() => setActiveMenu(null), 200)
    setMenuTimeout(t)
  }

  return (
    <>
      {/* ── USP Ticker Strip ─────────────────────────── */}
      <div className="bg-charcoal text-ivory/90 py-2 overflow-hidden relative">
        <div className="flex items-center gap-8 absolute left-0 top-1/2 -translate-y-1/2 px-4">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase whitespace-nowrap shrink-0">
            ✦ Saradhya Jewels
          </span>
        </div>
        <div className="ticker-wrapper pl-44">
          <div className="ticker-inner gap-12">
            {[...Array(4)].map((_, k) => (
              <span key={k} className="inline-flex items-center gap-8">
                <span className="inline-flex items-center gap-2 whitespace-nowrap">
                  <span className="text-gold/70 text-2xs font-semibold tracking-widest uppercase">✨ Starting at</span>
                  <span className="text-ivory text-xs font-medium">₹299 Only</span>
                </span>
                <span className="text-gold/40 text-xs">◆</span>
                <span className="text-ivory/50 text-xs whitespace-nowrap">Free Shipping Across India</span>
                <span className="text-gold/40 text-xs">◆</span>
                <span className="text-ivory/50 text-xs whitespace-nowrap">Cash on Delivery Available</span>
                <span className="text-gold/40 text-xs">◆</span>
                <span className="text-ivory/50 text-xs whitespace-nowrap">Premium 1 Gram Gold Plating</span>
                <span className="text-gold/40 text-xs">◆</span>
                <span className="text-ivory/50 text-xs whitespace-nowrap">500+ Stunning Designs</span>
                <span className="text-gold/40 text-xs">◆</span>
                <span className="text-ivory/50 text-xs whitespace-nowrap">Real Gold Look · Affordable Price</span>
                <span className="text-gold/40 text-xs">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Header ──────────────────────────────── */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'header-glass shadow-luxury-sm' : 'bg-ivory'
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Gold hairline top border */}
        <div className="gold-divider-full h-px" />

        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4">

            {/* ── Mobile Hamburger ── */}
            <button
              id="mobile-menu-btn"
              onClick={openMobileNav}
              className="lg:hidden btn-icon"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex-shrink-0 flex flex-col items-center group"
              aria-label="Saradhya Jewels Home"
            >
              <span className="font-display text-2xl md:text-3xl font-light tracking-wider text-charcoal group-hover:text-gold transition-colors duration-400 leading-none">
                Saradhya
              </span>
              <span className="font-body text-2xs font-semibold tracking-widest-3 text-gold uppercase">
                Jewels
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const menuData = link.dropdown || link.megaMenu
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => menuData && handleMenuEnter(link.id)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `nav-link flex items-center gap-1 py-6 ${isActive ? 'text-gold' : ''}`
                      }
                    >
                      {link.label}
                      {menuData && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            activeMenu === link.id ? 'rotate-180 text-gold' : ''
                          }`}
                        />
                      )}
                    </NavLink>

                    {/* Dropdown / Mega Menu */}
                    <AnimatePresence>
                      {menuData && activeMenu === link.id && (
                        <MegaMenu
                          data={menuData}
                          onMouseEnter={() => { if (menuTimeout) clearTimeout(menuTimeout) }}
                          onMouseLeave={handleMenuLeave}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </nav>

            {/* ── Header Icons ── */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                id="search-btn"
                onClick={openSearch}
                className="btn-icon"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="btn-icon relative"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-gold text-ivory text-2xs font-bold flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Cart */}
              <button
                id="cart-btn"
                onClick={openCart}
                className="btn-icon relative"
                aria-label={`Cart (${totalCartCount} items)`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <motion.span
                    key={totalCartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-charcoal text-2xs font-bold flex items-center justify-center"
                  >
                    {totalCartCount}
                  </motion.span>
                )}
              </button>

              {/* User / Auth */}
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="btn-icon hidden sm:flex text-gold relative"
                  aria-label={`My Account (${user?.displayName || 'Member'})`}
                  title={`Logged in as ${user?.displayName || user?.email}`}
                >
                  <div className="w-6 h-6 rounded-full bg-gold/15 text-gold text-3xs font-bold flex items-center justify-center border border-gold/40">
                    {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                </Link>
              ) : (
                <Link
                  to="/auth/login"
                  className="btn-icon hidden sm:flex text-charcoal/80 hover:text-gold transition-colors"
                  aria-label="Sign In or Register"
                  title="Sign In or Register"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* WhatsApp CTA (desktop) */}
              <a
                href={`https://wa.me/919876543210`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-2 ml-4 px-5 py-2 bg-charcoal text-ivory text-xs font-semibold tracking-widest uppercase transition-all duration-400 hover:bg-gold hover:text-charcoal"
                aria-label="Chat on WhatsApp"
              >
                <Phone className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Gold hairline bottom border */}
        <div className="gold-divider-full h-px" />
      </motion.header>

      {/* Mobile Nav Drawer */}
      <MobileNav />
    </>
  )
}

