import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Tag } from 'lucide-react'

// A full-width festive sale banner — for 1 gram jewellery
export default function FestiveBanner() {
  return (
    <section id="festive-banner" className="py-16 bg-jewel-ruby relative overflow-hidden" aria-label="Festive sale banner">
      {/* Decorative circles */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-gold/20 pointer-events-none" />
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-gold/15 pointer-events-none" />
      <div className="absolute left-1/3 -bottom-10 w-32 h-32 rounded-full border border-gold/10 pointer-events-none" />

      <div className="relative max-w-screen-xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          {/* Label */}
          <motion.p
            className="font-body text-xs font-semibold tracking-widest-2 text-gold uppercase mb-3 flex items-center justify-center md:justify-start gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            🪔 Diwali Special — Up to 40% Off
          </motion.p>

          <motion.h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-ivory leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Festive
            <span className="text-gold italic"> Jewellery Sale</span>
            <br />is Live Now
          </motion.h2>

          <motion.p
            className="font-body text-sm text-ivory/60 mt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Grab the best 1 gram gold jewellery at unbeatable prices. Limited stock — hurry!
          </motion.p>

          {/* Offer highlights */}
          <motion.div
            className="flex flex-wrap gap-3 mt-5 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {['Buy 2 Get 1 Free', 'Free Shipping', 'COD Available'].map((offer) => (
              <span key={offer} className="inline-flex items-center gap-1.5 text-2xs font-semibold text-gold bg-gold/10 border border-gold/20 px-3 py-1.5">
                <Tag className="w-3 h-3" />
                {offer}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Countdown + CTA */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            {[{ val: '29', label: 'Days' }, { val: '08', label: 'Hours' }, { val: '47', label: 'Mins' }].map((t) => (
              <div key={t.label} className="text-center">
                <div className="font-display text-4xl font-light text-gold w-16 h-16 border border-gold/40 flex items-center justify-center">
                  {t.val}
                </div>
                <div className="font-body text-2xs text-ivory/50 uppercase tracking-wider mt-1">{t.label}</div>
              </div>
            ))}
          </div>
          <Link to="/collection" id="festive-banner-cta" className="btn-primary group">
            Shop the Sale
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
