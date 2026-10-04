import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star, Eye, Check } from 'lucide-react'
import { formatINR } from '@/utils/currency'
import { useWishlistStore, useCartStore, useUIStore } from '@/store'
import toast from 'react-hot-toast'

export default function ProductCard({ product, onQuickView }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const { toggleWishlist, isWishlisted } = useWishlistStore()
  const { addItem } = useCartStore()
  const { openCart } = useUIStore()

  const wishlisted = isWishlisted(product.id)

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product.id)
    if (!wishlisted) {
      toast.success(`Saved "${product.name}" to wishlist`, {
        icon: '❤️',
      })
    } else {
      toast('Removed from wishlist', {
        icon: '🤍',
      })
    }
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)

    addItem({
      productId: product.id,
      variantId: `${product.id}-default`,
      name: product.name,
      price: product.price,
      image: product.image,
      metal: product.material,
      karat: product.purity,
      qty: 1,
    })

    toast.success(`${product.name} added to cart!`, {
      style: { background: '#1A1A2E', color: '#FBF7F0', border: '1px solid #C9A227' },
      iconTheme: { primary: '#C9A227', secondary: '#1A1A2E' },
    })

    setTimeout(() => {
      setIsAdding(false)
      openCart()
    }, 400)
  }

  const handleQuickViewClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onQuickView) onQuickView(product)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col bg-white border border-sand/70 hover:border-gold/60 transition-all duration-500 hover:shadow-card-hover overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Image & Hover Actions ── */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/5] bg-sand/20 overflow-hidden"
        aria-label={product.name}
      >
        {/* Main Image */}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered && product.secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          onError={(e) => {
            if (product.fallbackImage) e.currentTarget.src = product.fallbackImage
          }}
          loading="lazy"
        />

        {/* Secondary Image on Hover (if available) */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100 pointer-events-none'
            }`}
            onError={(e) => {
              if (product.fallbackImage) e.currentTarget.src = product.fallbackImage
            }}
            loading="lazy"
          />
        )}

        {/* ── Badges (Only shown when relevant) ── */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="badge-gold shadow-sm font-semibold tracking-wider">
              {product.badge}
            </span>
          )}
          {product.originalPrice && product.discount > 0 && (
            <span className="badge-sale shadow-sm font-semibold">
              {product.discount}% OFF
            </span>
          )}
          {product.hallmarkCertified && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-2xs bg-charcoal/85 text-gold-light backdrop-blur-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              BIS 916
            </span>
          )}
        </div>

        {/* ── Wishlist Button ── */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2.5 right-2.5 z-20 p-2 sm:p-2.5 rounded-full bg-white/95 text-charcoal shadow-luxury-sm hover:scale-110 active:scale-95 transition-all duration-300"
          aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-300 ${
              wishlisted
                ? 'fill-rose-gold text-rose-gold'
                : 'text-charcoal/70 hover:text-rose-gold'
            }`}
          />
        </button>

        {/* ── Quick View Button (Desktop) ── */}
        <button
          onClick={handleQuickViewClick}
          className="hidden sm:flex absolute top-12 right-2.5 z-20 p-2 sm:p-2.5 rounded-full bg-white/95 text-charcoal/70 hover:text-gold shadow-luxury-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
          aria-label={`Quick preview for ${product.name}`}
          title="Quick Preview"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* ── Quick Add to Bag Slide Bar (Desktop) ── */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="hidden sm:flex items-center justify-center gap-2 absolute bottom-0 inset-x-0 py-3 bg-charcoal text-ivory text-xs font-semibold tracking-widest uppercase transition-transform duration-300 transform translate-y-full group-hover:translate-y-0 hover:bg-gold hover:text-charcoal z-20"
          aria-label={`Add ${product.name} to Cart`}
        >
          {isAdding ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" /> Added to Bag
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" /> Quick Add to Bag
            </>
          )}
        </button>
      </Link>

      {/* ── Product Information ── */}
      <div className="flex-1 flex flex-col justify-between p-3.5 sm:p-4">
        <div>
          {/* Material & Weight */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="font-body text-2xs uppercase tracking-widest-2 text-gold font-semibold truncate">
              {product.material}
            </span>
            {product.weight && (
              <span className="font-body text-2xs text-charcoal/50 whitespace-nowrap shrink-0">
                {product.weight}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.slug}`}
            className="block font-display text-sm sm:text-base font-medium text-charcoal hover:text-gold transition-colors line-clamp-2 leading-snug mb-2"
          >
            {product.name}
          </Link>
        </div>

        <div>
          {/* Rating (Shown ONLY when rating & reviews exist) */}
          {product.rating && product.reviewsCount ? (
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center text-gold">
                <Star className="w-3 h-3 fill-gold" />
              </div>
              <span className="font-body text-2xs font-semibold text-charcoal">
                {product.rating}
              </span>
              <span className="font-body text-2xs text-charcoal/40">
                ({product.reviewsCount})
              </span>
            </div>
          ) : null}

          {/* Price Section */}
          <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0.5 pt-1 border-t border-sand/50">
            <span className="font-body text-base sm:text-lg font-bold text-charcoal">
              {formatINR(product.price)}
            </span>

            {/* Original Price (Shown ONLY when originalPrice exists) */}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="font-body text-xs text-charcoal/40 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile Add to Cart CTA (Compact Touch Target) */}
          <div className="sm:hidden mt-3 pt-2 border-t border-sand/40">
            <button
              onClick={handleAddToCart}
              className="w-full py-2 bg-charcoal text-ivory text-2xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 hover:bg-gold hover:text-charcoal transition-colors active:scale-98"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
