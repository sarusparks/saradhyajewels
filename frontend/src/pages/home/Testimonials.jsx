import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/utils/constants'

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-charcoal overflow-hidden" aria-labelledby="testimonials-heading">
      {/* Decorative gold blur orbs */}
      <div className="absolute left-0 top-1/2 w-96 h-96 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-1/2 w-96 h-96 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            className="font-body text-xs font-semibold tracking-widest-2 text-gold uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Real Reviews · Real Customers
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            className="section-title-light"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Loved by <span className="text-gold-gradient italic">50,000+ Happy Customers</span>
          </motion.h2>
          <div className="w-16 h-px mx-auto mt-6" style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-charcoal-light border border-ivory/10 p-8 hover:border-gold/30 transition-colors duration-500 group"
            >
              {/* Gold quote mark */}
              <Quote className="w-8 h-8 text-gold/20 mb-4 group-hover:text-gold/40 transition-colors duration-400" fill="currentColor" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                ))}
              </div>

              {/* Review text */}
              <p className="font-body text-sm text-ivory/70 leading-relaxed mb-6 italic">
                "{t.text}"
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-ivory/10">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                  <span className="font-display text-gold font-medium text-sm">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-ivory">{t.name}</p>
                  <p className="font-body text-xs text-ivory/40">{t.location} · {t.product}</p>
                </div>
                {/* Verified badge */}
                <span className="ml-auto text-2xs font-semibold text-gold/70 tracking-wider uppercase">✓ Verified</span>
              </div>

              {/* Gold corner accent */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/0 group-hover:border-gold/40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Overall rating strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mt-14 pt-10 border-t border-ivory/10"
        >
          <div className="text-center">
            <div className="font-display text-6xl font-light text-gold">4.9 ★</div>
            <div className="flex justify-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold fill-gold" />
              ))}
            </div>
            <div className="font-body text-xs text-ivory/40 uppercase tracking-wider">Average Rating</div>
          </div>

          <div className="hidden md:block w-px h-16 bg-ivory/10" />

          <div className="text-center">
            <div className="font-display text-6xl font-light text-ivory">50K+</div>
            <div className="font-body text-xs text-ivory/40 uppercase tracking-wider mt-2">Happy Customers</div>
          </div>

          <div className="hidden md:block w-px h-16 bg-ivory/10" />

          <div className="text-center">
            <div className="font-display text-6xl font-light text-ivory">98%</div>
            <div className="font-body text-xs text-ivory/40 uppercase tracking-wider mt-2">Would Recommend</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
