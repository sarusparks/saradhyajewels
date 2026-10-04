import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { METAL_TYPES } from '@/utils/constants'

export default function ShopByStyle() {
  return (
    <section id="shop-by-style" className="py-24 bg-sand" aria-labelledby="style-heading">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Handcrafted. Gold-Plated. Stunning.
          </motion.p>
          <motion.h2
            id="style-heading"
            className="section-title"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Shop by <span className="text-gold-gradient italic">Jewellery Type</span>
          </motion.h2>
          <div className="gold-divider mt-6" />
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METAL_TYPES.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={item.href}
                id={`style-${item.id}`}
                className="group relative block overflow-hidden bg-charcoal cursor-pointer"
                aria-label={`Shop ${item.label}`}
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden img-zoom">
                  <img
                    src={item.image}
                    alt={`${item.label} 1 gram gold jewellery`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-75"
                    style={{
                      background: `linear-gradient(to top, ${item.bgColor}ee 0%, ${item.bgColor}55 50%, transparent 100%)`,
                    }}
                  />
                  {/* Gold border reveal on hover */}
                  <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/50 transition-all duration-500 z-10" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  {/* Tag badge */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="font-body text-2xs tracking-widest uppercase font-semibold"
                          style={{ color: item.accentColor }}>
                      ✦ {item.description}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl font-light leading-tight mb-1 text-ivory">
                    {item.label}
                  </h3>
                  <p className="font-body text-xs tracking-wider mb-4" style={{ color: item.accentColor }}>
                    {item.sublabel}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 font-body text-xs font-semibold tracking-widest uppercase text-ivory
                                   border-b border-ivory/30 pb-0.5 group-hover:border-gold group-hover:text-gold transition-all duration-400">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Promo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 p-8 md:p-12 bg-charcoal flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-gold mb-2">🎉 Limited Time Offer</p>
            <h3 className="font-display text-3xl md:text-4xl font-light text-ivory">
              Buy 2 Get 1 Free on
              <span className="text-gold italic"> All Earrings</span>
            </h3>
            <p className="font-body text-sm text-ivory/50 mt-2">
              Use code <span className="text-gold font-semibold">EARRING3</span> at checkout · Ends soon
            </p>
          </div>
          <Link to="/collection?category=earrings" id="offer-banner-cta" className="btn-primary shrink-0">
            Shop Earrings <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
