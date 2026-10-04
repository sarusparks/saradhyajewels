import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-charcoal"
      aria-label="Hero — Saradhya Jewels"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="1 gram gold jewellery editorial — beautiful affordable gold-plated sets"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-hero-overlay" />
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      {/* Decorative gold corner lines */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-gold/40 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-gold/40 hidden md:block" />

      {/* Floating price tag badges */}
      <motion.div
        className="absolute top-28 right-8 md:right-24 hidden md:flex flex-col items-end gap-3"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1, duration: 0.7 }}
      >
        <div className="bg-gold text-charcoal text-xs font-bold px-4 py-2 shadow-luxury-sm flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Starts at just ₹299
        </div>
        <div className="bg-white/10 backdrop-blur-md border border-ivory/20 text-ivory text-xs px-4 py-2">
          Looks like real gold ✨
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">

          {/* Pre-heading pill */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="w-8 h-px bg-gold" />
            <span className="font-body text-xs font-semibold tracking-widest-2 text-gold uppercase flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              Premium 1 Gram Gold Jewellery
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-ivory leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Real Gold
            <br />
            <span className="text-gold-shimmer font-medium italic">Look. Real</span>
            <br />
            Savings.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="font-body text-base md:text-lg text-ivory/65 leading-relaxed mb-10 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            Beautiful 1 gram gold jewellery that looks like real gold — crafted with thick gold plating, stunning designs, and unbeatable prices. Earrings, necklaces, bangles, sets & more.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <Link to="/collection" id="hero-shop-now" className="btn-primary group">
              Shop Now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/collection?occasion=Bridal" id="hero-bridal" className="btn-outline-ivory">
              Bridal Collections
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="flex items-center gap-6 mt-12 pt-10 border-t border-ivory/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            {[
              { num: '50,000+', label: 'Happy Customers' },
              { num: '₹299', label: 'Starting Price' },
              { num: '500+', label: 'Designs' },
              { num: '4.9', label: 'Avg Rating', icon: true },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-xl md:text-2xl font-medium text-gold leading-none mb-1 flex items-center justify-center gap-0.5">
                  {stat.num}
                  {stat.icon && <Star className="w-4 h-4 fill-gold text-gold" />}
                </div>
                <div className="font-body text-2xs tracking-wider text-ivory/50 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="font-body text-2xs tracking-widest text-ivory/40 uppercase">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
