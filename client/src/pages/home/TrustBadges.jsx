import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TRUST_POINTS } from '@/utils/constants'

export default function TrustBadges() {
  return (
    <section id="trust-badges" className="py-20 bg-sand" aria-labelledby="trust-heading">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            id="trust-heading"
            className="font-display text-3xl font-light text-charcoal"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose <span className="text-gold-gradient italic">Saradhya Jewels</span>
          </motion.h2>
          <div className="gold-divider mt-4" />
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-sand-dark">
          {TRUST_POINTS.map((point, i) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center p-8 bg-ivory hover:bg-white transition-colors duration-400 group"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 transition-transform duration-400 group-hover:scale-110">
                {point.icon}
              </div>

              {/* Gold hairline */}
              <div className="w-8 h-px bg-gold/40 group-hover:bg-gold group-hover:w-12 transition-all duration-400 mb-4" />

              <h3 className="font-body text-xs font-bold tracking-wider uppercase text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
                {point.title}
              </h3>
              <p className="font-body text-xs text-charcoal/55 leading-relaxed">
                {point.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 1 Gram Gold Quality Promise Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 p-6 border border-gold/30 flex flex-col md:flex-row items-center justify-center gap-4 text-center"
        >
          <span className="text-2xl">✨</span>
          <p className="font-body text-sm text-charcoal/70">
            <span className="font-semibold text-charcoal">Every piece at Saradhya Jewels</span> is crafted with{' '}
            <span className="text-gold font-semibold">premium 1 gram gold plating</span> — giving you the luxurious look of real gold at an affordable price.
          </p>
          <Link
            to="/collection"
            className="shrink-0 font-body text-xs font-semibold tracking-wider uppercase text-gold border-b border-gold/40 hover:border-gold transition-colors pb-0.5"
          >
            Shop Now →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
