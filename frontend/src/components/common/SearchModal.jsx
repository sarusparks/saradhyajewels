import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight, Sparkles } from 'lucide-react'
import { useUIStore } from '@/store'
import { FEATURED_PRODUCTS } from '@/utils/constants'
import { formatINR } from '@/utils/currency'

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useUIStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isSearchOpen])

  const filteredProducts = query.trim()
    ? FEATURED_PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.metal.toLowerCase().includes(query.toLowerCase()) ||
        (p.karat && p.karat.toLowerCase().includes(query.toLowerCase()))
      )
    : []

  const handleSelect = (slug) => {
    closeSearch()
    navigate(`/product/${slug}`)
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-ivory rounded-xl shadow-2xl border border-gold/30 overflow-hidden z-10"
          >
            {/* Input Header */}
            <div className="p-4 sm:p-6 border-b border-sand/80 flex items-center gap-3">
              <Search className="w-5 h-5 text-gold shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jewellery (e.g. 22K Gold, Temple Necklace, 925 Silver)..."
                className="w-full bg-transparent text-charcoal placeholder-charcoal/40 text-base sm:text-lg outline-none font-serif"
              />
              <button
                onClick={closeSearch}
                className="p-1.5 rounded-full hover:bg-sand/60 text-charcoal/50 hover:text-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Suggestions & Results */}
            <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4">
              {query.trim() === '' ? (
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gold uppercase tracking-wider font-semibold mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Popular Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Temple Jewellery', '22K Gold Necklace', 'Bridal Set', 'Oxidised Silver', 'Kundan Choker', 'Daily Wear Earrings'].map((item) => (
                      <button
                        key={item}
                        onClick={() => setQuery(item)}
                        className="px-3 py-1.5 rounded-full text-xs bg-sand/60 hover:bg-gold/20 text-charcoal hover:text-gold-dark transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wider text-charcoal/60 font-medium">
                    Found {filteredProducts.length} jewellery match{filteredProducts.length > 1 ? 'es' : ''}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect(p.slug)}
                        className="flex items-center gap-3 p-2.5 rounded-lg border border-sand hover:border-gold/60 hover:bg-white cursor-pointer transition-all"
                      >
                        <img src={p.image} alt={p.name} className="w-14 h-14 rounded object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-sm font-semibold truncate text-charcoal">{p.name}</p>
                          <p className="text-xs text-gold font-bold">{formatINR(p.price)}</p>
                          <span className="text-[10px] text-charcoal/50 uppercase">{p.metal} {p.karat ? `· ${p.karat}` : ''}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-charcoal/40" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-charcoal/60 text-sm">
                  No matching jewellery pieces found for "{query}".
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
