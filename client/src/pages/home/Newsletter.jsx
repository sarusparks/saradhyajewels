import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1000))
    setLoading(false)
    setEmail('')
    toast.success('Welcome to the Saradhya Jewels family! 💎', {
      style: { background: '#1A1A2E', color: '#FBF7F0', border: '1px solid #C9A227' },
      iconTheme: { primary: '#C9A227', secondary: '#1A1A2E' },
    })
  }

  return (
    <section
      id="newsletter"
      className="relative py-24 overflow-hidden"
      aria-labelledby="newsletter-heading"
      style={{
        background: 'linear-gradient(135deg, #8B6914 0%, #C9A227 35%, #F0D080 55%, #C9A227 75%, #8B6914 100%)',
      }}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251,247,240,0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, rgba(251,247,240,0.1) 0%, transparent 50%)`,
        }}
      />
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-20" />

      <div className="relative max-w-2xl mx-auto px-4 lg:px-8 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <Sparkles className="w-10 h-10 text-charcoal/60" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          id="newsletter-heading"
          className="font-display text-4xl md:text-5xl font-light text-charcoal leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          First to See New
          <br />
          <span className="font-medium italic">Designs & Deals</span>
        </motion.h2>

        <motion.p
          className="font-body text-sm text-charcoal/70 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Join 50,000+ jewellery lovers. Be the first to shop new 1 gram gold designs, get exclusive discounts, and festive collection drops — straight to your inbox.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          aria-label="Newsletter signup form"
        >
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 px-5 py-3.5 font-body text-sm text-charcoal bg-ivory/95 border-2 border-transparent
                       focus:outline-none focus:border-charcoal transition-all duration-300
                       placeholder-charcoal/40"
          />
          <button
            type="submit"
            id="newsletter-submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-7 py-3.5 bg-charcoal text-ivory font-body font-semibold text-sm
                       tracking-widest uppercase transition-all duration-400 hover:bg-charcoal-light disabled:opacity-60"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
            ) : (
              <>
                Subscribe <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </motion.form>

        {/* Privacy note */}
        <motion.p
          className="font-body text-xs text-charcoal/50 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          No spam. Unsubscribe anytime. We respect your privacy.
        </motion.p>

        {/* Perks */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          {['✦ Exclusive Discounts', '✦ New Designs First', '✦ Styling Tips', '✦ Festive Collections'].map((perk) => (
            <span key={perk} className="font-body text-xs text-charcoal/60 font-medium">
              {perk}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
