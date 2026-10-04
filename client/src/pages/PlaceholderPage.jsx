import { Link, useLocation } from 'react-router-dom'
import { Sparkles, ArrowLeft } from 'lucide-react'

export default function PlaceholderPage({ title, phase = 'Phase 2' }) {
  const location = useLocation()
  const displayTitle = title || location.pathname.replace('/', '').replace(/-/g, ' ').toUpperCase()

  return (
    <main className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-ivory">
      <div className="max-w-lg w-full text-center p-8 bg-white/80 backdrop-blur rounded-2xl border border-sand shadow-xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center text-gold">
          <Sparkles className="w-8 h-8" />
        </div>
        <p className="text-xs uppercase font-bold tracking-widest text-gold mb-2">Coming in {phase}</p>
        <h1 className="font-serif text-3xl font-bold text-charcoal mb-4 capitalize">
          {displayTitle}
        </h1>
        <p className="text-sm text-charcoal/70 mb-8 leading-relaxed">
          The curated collection and interactive features for this section are scheduled in the upcoming build phase. Stay tuned for live gold rate calculators, high-resolution zoom galleries, and custom bridal styling!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-ivory rounded font-medium text-xs tracking-wider uppercase hover:bg-gold-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </main>
  )
}
