import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { OCCASIONS } from '@/utils/constants'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

// Background gradients per occasion
const gradients = {
  wedding: 'from-amber-950 via-amber-900 to-amber-800',
  festive: 'from-orange-950 via-red-900 to-orange-800',
  daily: 'from-yellow-950 via-amber-900 to-yellow-800',
  office: 'from-stone-900 via-stone-800 to-stone-700',
  gifting: 'from-rose-950 via-rose-900 to-pink-800',
}

export default function ShopByOccasion() {
  return (
    <section id="shop-by-occasion" className="py-24 bg-ivory" aria-labelledby="occasion-heading">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Jewellery for Every Moment
          </motion.p>
          <motion.h2
            id="occasion-heading"
            className="section-title"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Shop by <span className="text-gold-gradient italic">Occasion</span>
          </motion.h2>
          <div className="gold-divider mt-6" />
        </div>

        {/* Occasion Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {OCCASIONS.map((occasion, i) => (
            <motion.div
              key={occasion.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Link
                to={occasion.href}
                id={`occasion-${occasion.id}`}
                className="group relative flex flex-col items-center justify-end h-52 md:h-64 overflow-hidden cursor-pointer"
                aria-label={`Shop ${occasion.label} jewelry`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b ${gradients[occasion.id]} transition-all duration-500 group-hover:scale-105`} />

                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(201,162,39,0.4) 0%, transparent 70%)`,
                  }}
                />

                {/* Gold border on hover */}
                <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/60 transition-all duration-500 z-10" />

                {/* Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl md:text-6xl
                                transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-3/4">
                  {occasion.icon}
                </div>

                {/* Label */}
                <div className="relative z-10 w-full px-4 pb-5 text-center">
                  <h3 className="font-display text-lg font-medium text-ivory">
                    {occasion.label}
                  </h3>
                  <p className="font-body text-2xs text-ivory/60 tracking-wider mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    {occasion.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-gold text-2xs font-semibold tracking-wider mt-2 uppercase
                                   opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
