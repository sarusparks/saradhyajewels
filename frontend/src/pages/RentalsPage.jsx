// src/pages/RentalsPage.jsx — Saradhya Jewels Bridal & Event Jewellery Rentals
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Calendar,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  Phone,
  Clock,
  Heart,
  X,
  Send,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react'
import toast from 'react-hot-toast'
import { BRAND } from '@/utils/constants'
import {
  RENTAL_CATEGORIES,
  RENTAL_PRODUCTS,
  RENTAL_STEPS,
  RENTAL_FAQS
} from '@/data/rentalsData'

export default function RentalsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedDurations, setSelectedDurations] = useState({}) // { [productId]: 1 | 3 | 7 }
  const [activeFaq, setActiveFaq] = useState(null)
  const [bookingModalProduct, setBookingModalProduct] = useState(null)
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    city: '',
    eventDate: '',
    duration: 3,
    notes: '',
  })

  // Sync category changes with URL
  useEffect(() => {
    const cat = searchParams.get('category') || 'all'
    setSelectedCategory(cat)
  }, [searchParams])

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId)
    if (catId === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: catId })
    }
  }

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return RENTAL_PRODUCTS
    return RENTAL_PRODUCTS.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    )
  }, [selectedCategory])

  const getDuration = (prodId) => selectedDurations[prodId] || 3 // default 3 days for weddings

  const setDuration = (prodId, days) => {
    setSelectedDurations((prev) => ({ ...prev, [prodId]: days }))
  }

  const getPriceForDuration = (product, days) => {
    if (days === 1) return product.dailyRate
    if (days === 7) return product.sevenDayRate
    return product.threeDayRate
  }

  const handleOpenBooking = (product) => {
    const days = getDuration(product.id)
    setBookingModalProduct(product)
    setBookingForm((prev) => ({
      ...prev,
      duration: days,
    }))
  }

  const handleCloseBooking = () => {
    setBookingModalProduct(null)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!bookingForm.name || !bookingForm.phone || !bookingForm.eventDate) {
      toast.error('Please fill in your name, phone, and event date.')
      return
    }

    const price = getPriceForDuration(bookingModalProduct, Number(bookingForm.duration))
    const msg = `*Rental Booking Inquiry — Saradhya Jewels*%0A%0A` +
      `*Jewellery Set:* ${encodeURIComponent(bookingModalProduct.name)}%0A` +
      `*Duration:* ${bookingForm.duration} Days%0A` +
      `*Rental Fee:* ₹${price.toLocaleString('en-IN')}%0A` +
      `*Refundable Deposit:* ₹${bookingModalProduct.securityDeposit.toLocaleString('en-IN')}%0A` +
      `*Event Date:* ${encodeURIComponent(bookingForm.eventDate)}%0A` +
      `*Customer:* ${encodeURIComponent(bookingForm.name)} (${encodeURIComponent(bookingForm.phone)})%0A` +
      `*Delivery City:* ${encodeURIComponent(bookingForm.city || 'Not specified')}%0A` +
      `*Notes:* ${encodeURIComponent(bookingForm.notes || 'None')}`

    const waUrl = `https://wa.me/${BRAND.whatsapp}?text=${msg}`
    window.open(waUrl, '_blank')
    toast.success('Opening WhatsApp to confirm your rental reservation!')
    handleCloseBooking()
  }

  const handleWhatsAppQuickChat = (product) => {
    const days = getDuration(product.id)
    const price = getPriceForDuration(product, days)
    const msg = `Hello Saradhya Jewels! I am interested in renting the *${encodeURIComponent(product.name)}* for *${days} Days* (₹${price.toLocaleString('en-IN')}). Could you please check availability for my upcoming occasion?`
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${msg}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-ivory text-charcoal pb-24">
      {/* ── Hero Section ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-charcoal text-ivory py-16 md:py-24 border-b border-gold/20">
        {/* Subtle background glow */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold via-charcoal to-charcoal pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-2xs md:text-xs font-semibold tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Saradhya Royal Rental Concierge</span>
            </div>

            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-wide text-ivory leading-tight mb-6">
              Regal Bridal & Event <br />
              <span className="italic font-serif text-gold font-normal">Jewellery on Rent</span>
            </h1>

            <p className="font-body text-sm md:text-base text-ivory/70 leading-relaxed mb-8 max-w-2xl">
              Experience the grandeur of pure 1 Gram Gold, Antique Nakshi, and Kundan bridal trousseaus without the heirloom price tag. Curated complete sets starting at just <strong className="text-gold font-medium">₹599/day</strong> with doorstep sanitized delivery and hassle-free returns.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#rental-catalog"
                className="px-6 py-3.5 bg-gold text-charcoal text-xs font-semibold tracking-widest uppercase rounded hover:bg-gold-light transition-all duration-300 shadow-luxury-sm inline-flex items-center gap-2"
              >
                Browse Rental Sets
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hello Saradhya Jewels! I would like to inquire about jewellery rentals for my upcoming wedding/event.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 border border-gold/50 text-gold hover:bg-gold/10 text-xs font-semibold tracking-widest uppercase rounded transition-colors duration-300 inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                WhatsApp Styling Help
              </a>
            </div>
          </div>
        </div>

        {/* Value Strip */}
        <div className="mt-14 border-t border-ivory/10 pt-8">
          <div className="max-w-screen-xl mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '✨', title: '100% Sanitized', desc: 'UV sterilization & skin-safe cleaning' },
              { icon: '📅', title: 'Flexible 3 to 7 Days', desc: 'Early delivery 48h before event' },
              { icon: '🚚', title: 'Doorstep Pickup', desc: 'Complimentary return collection' },
              { icon: '🛡️', title: 'Low Security Deposit', desc: 'Prompt refund within 24 hours' },
            ].map((perk) => (
              <div key={perk.title} className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">{perk.icon}</span>
                <div>
                  <h4 className="font-body text-xs md:text-sm font-semibold text-ivory tracking-wide">{perk.title}</h4>
                  <p className="font-body text-2xs md:text-xs text-ivory/60 leading-normal">{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filter Tabs ────────────────────────── */}
      <section id="rental-catalog" className="max-w-screen-xl mx-auto px-4 lg:px-8 pt-12 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="section-label mb-2">Curated Rentals</p>
            <h2 className="font-display text-2xl md:text-3xl font-light text-charcoal">
              Choose Your Signature Bridal & Festive Look
            </h2>
          </div>
          <span className="font-body text-xs text-charcoal/60">
            Showing <strong className="text-charcoal font-semibold">{filteredProducts.length}</strong> rental sets available
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-sand">
          {RENTAL_CATEGORIES.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.id.toLowerCase()
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-charcoal text-ivory shadow-sm'
                    : 'bg-sand/40 text-charcoal/70 hover:bg-sand hover:text-charcoal'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-2xs px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-gold text-charcoal font-bold' : 'bg-charcoal/10 text-charcoal/60'
                }`}>
                  {cat.id === 'all'
                    ? RENTAL_PRODUCTS.length
                    : RENTAL_PRODUCTS.filter((p) => p.category === cat.id).length}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Rental Products Grid ────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const currentDuration = getDuration(product.id)
            const rentalPrice = getPriceForDuration(product, currentDuration)

            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group bg-white rounded-xl border border-sand/80 shadow-luxury-sm hover:shadow-luxury transition-all duration-400 flex flex-col overflow-hidden"
              >
                {/* Image & Badge */}
                <div className="relative aspect-[4/5] bg-sand/20 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      if (product.fallbackImage) e.currentTarget.src = product.fallbackImage
                    }}
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 badge-gold text-2xs font-semibold shadow-xs">
                      {product.badge}
                    </span>
                  )}

                  {/* Purity Tag */}
                  <span className="absolute bottom-3 left-3 bg-charcoal/80 backdrop-blur-sm text-ivory text-3xs tracking-wider uppercase px-2.5 py-1 rounded">
                    {product.purity}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-3xs uppercase tracking-widest-2 text-gold font-semibold">
                      {product.categoryLabel}
                    </span>
                    <h3 className="font-display text-base font-medium text-charcoal leading-snug mt-1 mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Includes tags */}
                    <div className="mb-4">
                      <p className="text-3xs uppercase tracking-wider text-charcoal/50 mb-1 font-semibold flex items-center gap-1">
                        <Layers className="w-3 h-3 text-gold" /> Set Includes:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {product.includes.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="text-3xs bg-sand/40 text-charcoal/80 px-2 py-0.5 rounded"
                          >
                            {item}
                          </span>
                        ))}
                        {product.includes.length > 3 && (
                          <span className="text-3xs bg-gold/15 text-gold-dark font-medium px-1.5 py-0.5 rounded">
                            +{product.includes.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Duration Switcher */}
                    <div className="bg-sand/30 p-1 rounded-lg mb-3 flex items-center justify-between text-2xs font-medium">
                      <span className="text-charcoal/60 px-2 text-3xs font-semibold uppercase">Rental Plan:</span>
                      <div className="flex items-center gap-1">
                        {[
                          { days: 1, label: '1 Day' },
                          { days: 3, label: '3 Days' },
                          { days: 7, label: '7 Days' },
                        ].map(({ days, label }) => (
                          <button
                            key={days}
                            type="button"
                            onClick={() => setDuration(product.id, days)}
                            className={`px-2 py-1 rounded transition-colors text-2xs font-semibold ${
                              currentDuration === days
                                ? 'bg-gold text-charcoal shadow-2xs'
                                : 'text-charcoal/70 hover:text-charcoal'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline justify-between mb-4 border-t border-sand/50 pt-3">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-display text-xl font-bold text-charcoal">
                            ₹{rentalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-2xs text-charcoal/60 font-body">
                            / {currentDuration} {currentDuration === 1 ? 'Day' : 'Days'}
                          </span>
                        </div>
                        <p className="text-3xs text-charcoal/50">
                          Security Deposit: ₹{product.securityDeposit.toLocaleString('en-IN')} (Refundable)
                        </p>
                      </div>
                      <span className="text-3xs text-gold-dark bg-gold/10 px-2 py-0.5 rounded font-semibold">
                        Retail ₹{product.retailValue.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenBooking(product)}
                        className="w-full py-2.5 px-3 bg-charcoal text-ivory text-xs font-semibold tracking-wider uppercase rounded hover:bg-gold hover:text-charcoal transition-all duration-300 text-center"
                      >
                        Book Set
                      </button>
                      <button
                        onClick={() => handleWhatsAppQuickChat(product)}
                        className="w-full py-2.5 px-3 border border-emerald-600/40 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-600 hover:text-white text-xs font-semibold tracking-wider uppercase rounded transition-all duration-300 flex items-center justify-center gap-1.5"
                        title="Inquire directly on WhatsApp"
                      >
                        <Phone className="w-3 h-3" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── How Rental Works ────────────────────────────── */}
      <section id="how-it-works" className="max-w-screen-xl mx-auto px-4 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="section-label mb-2">Simplicity & Elegance</p>
          <h2 className="font-display text-3xl font-light text-charcoal">
            How Jewellery Rental Works
          </h2>
          <div className="gold-divider w-16 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RENTAL_STEPS.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-white border border-sand/80 shadow-luxury-sm hover:shadow-luxury transition-all relative"
            >
              <span className="font-display text-3xl font-light text-gold/40 block mb-3">
                {step.step}
              </span>
              <h3 className="font-display text-lg font-medium text-charcoal mb-2">
                {step.title}
              </h3>
              <p className="font-body text-xs text-charcoal/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ─────────────────────────────────── */}
      <section className="max-w-screen-md mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <p className="section-label mb-2">Frequently Asked Questions</p>
          <h2 className="font-display text-2xl md:text-3xl font-light text-charcoal">
            Rental Queries & Guidelines
          </h2>
        </div>

        <div className="space-y-3">
          {RENTAL_FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx
            return (
              <div
                key={idx}
                className="border border-sand rounded-xl bg-white/70 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display text-base font-medium text-charcoal"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm font-body text-charcoal/75 leading-relaxed border-t border-sand/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Bridal Concierge Help Banner ────────────────── */}
      <section className="max-w-screen-xl mx-auto px-4 lg:px-8 mt-12">
        <div className="rounded-2xl bg-charcoal text-ivory p-8 md:p-12 relative overflow-hidden border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-gold text-2xs uppercase tracking-widest-2 font-semibold">
              Need Personalized Bridal Matching?
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-light mt-2 mb-3">
              Book a Free Video Styling Consultation
            </h3>
            <p className="font-body text-xs md:text-sm text-ivory/70 leading-relaxed">
              Send our senior jewellery stylists a photo of your bridal lehenga or saree. We will match the perfect haram, choker, and hair accessories for your big day.
            </p>
          </div>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi! I would like to book a video consultation for jewellery rental matching with my bridal outfit.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gold text-charcoal font-semibold text-xs uppercase tracking-widest rounded hover:bg-gold-light transition-all whitespace-nowrap shadow-luxury shrink-0 inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Chat with Bridal Stylist
          </a>
        </div>
      </section>

      {/* ── Rental Booking Modal ────────────────────────── */}
      <AnimatePresence>
        {bookingModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
              onClick={handleCloseBooking}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-ivory rounded-2xl shadow-luxury-lg border border-gold/40 p-6 md:p-8 z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseBooking}
                className="absolute top-5 right-5 p-1 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-sand/40 transition-colors"
                aria-label="Close booking modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-2xs uppercase tracking-widest text-gold font-bold">
                  Rental Reservation
                </span>
                <h3 className="font-display text-xl md:text-2xl font-medium text-charcoal mt-1">
                  {bookingModalProduct.name}
                </h3>
              </div>

              {/* Selected summary */}
              <div className="bg-white rounded-xl p-4 border border-sand mb-6 flex items-center gap-4">
                <img
                  src={bookingModalProduct.image}
                  alt={bookingModalProduct.name}
                  className="w-16 h-16 object-cover rounded-lg border border-sand shrink-0"
                  onError={(e) => {
                    if (bookingModalProduct.fallbackImage) e.currentTarget.src = bookingModalProduct.fallbackImage
                  }}
                />
                <div className="flex-1 text-xs">
                  <div className="flex justify-between font-medium text-charcoal mb-1">
                    <span>Rental ({bookingForm.duration} Days):</span>
                    <strong className="text-gold-dark font-bold">
                      ₹{getPriceForDuration(bookingModalProduct, Number(bookingForm.duration)).toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div className="flex justify-between text-charcoal/60">
                    <span>Security Deposit (Refundable):</span>
                    <span>₹{bookingModalProduct.securityDeposit.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-2xs uppercase tracking-wider font-semibold text-charcoal/80 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-2xs uppercase tracking-wider font-semibold text-charcoal/80 mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-2xs uppercase tracking-wider font-semibold text-charcoal/80 mb-1">
                      Event / Muhurtham Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingForm.eventDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-2xs uppercase tracking-wider font-semibold text-charcoal/80 mb-1">
                      Rental Duration
                    </label>
                    <select
                      value={bookingForm.duration}
                      onChange={(e) => setBookingForm({ ...bookingForm, duration: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold"
                    >
                      <option value={1}>1 Day Plan</option>
                      <option value={3}>3 Days Plan (Recommended)</option>
                      <option value={7}>7 Days Plan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-2xs uppercase tracking-wider font-semibold text-charcoal/80 mb-1">
                      Delivery City / Pincode
                    </label>
                    <input
                      type="text"
                      value={bookingForm.city}
                      onChange={(e) => setBookingForm({ ...bookingForm, city: e.target.value })}
                      placeholder="e.g. Chennai 600001"
                      className="w-full px-4 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xs uppercase tracking-wider font-semibold text-charcoal/80 mb-1">
                    Special Styling Requests / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    placeholder="e.g. Need matching bangles size 2.6, early morning delivery"
                    className="w-full px-4 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs tracking-wider uppercase rounded-lg shadow-luxury transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Reserve via WhatsApp Concierge
                  </button>
                  <p className="text-3xs text-charcoal/50 text-center mt-2">
                    Zero cancellation fee up to 7 days before the event. Security deposit refundable upon return.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
