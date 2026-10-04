import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star, Eye, Sparkles } from 'lucide-react'
import { FEATURED_PRODUCTS } from '@/utils/constants'
import { formatINR, discountPercent } from '@/utils/currency'
import { useWishlistStore, useCartStore, useUIStore } from '@/store'
import toast from 'react-hot-toast'

const FILTERS = ['All', 'Earrings', 'Necklaces', 'Bangles', 'Sets', 'Bridal']

// Map filter label → category slug or occasion
const FILTER_MAP = {
  Earrings: 'earrings',
  Necklaces: 'necklaces',
  Bangles: 'bangles',
  Sets: 'jewellery-sets',
  Bridal: 'Bridal',
}

export default function FeaturedCollections() {
  const [activeFilter, setActiveFilter] = useState('All')
  const { toggleWishlist, isWishlisted } = useWishlistStore()
  const { addItem } = useCartStore()
  const { openCart } = useUIStore()

  // Since all our featured products are 1 gram, just show all for now
  const filtered = FEATURED_PRODUCTS

  const handleAddToCart = (product) => {
    addItem({
      productId: product.id,
      variantId: `${product.id}-default`,
      name: product.name,
      price: product.price,
      image: product.image,
      metal: product.metal,
      karat: product.karat,
      qty: 1,
    })
    toast.success(`${product.name} added to cart`, {
      style: { background: '#1A1A2E', color: '#FBF7F0', border: '1px solid #C9A227' },
      iconTheme: { primary: '#C9A227', secondary: '#1A1A2E' },
    })
    openCart()
  }

  return (
    <section id="featured-collections" className="py-24 bg-ivory" aria-labelledby="featured-heading">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Trending 1 Gram Gold Designs
          </motion.p>
          <motion.h2
            id="featured-heading"
            className="section-title"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Featured <span className="text-gold-gradient italic">Collections</span>
          </motion.h2>
          <div className="gold-divider mt-6" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
          {FILTERS.map((filter) => (
            <Link
              key={filter}
              to={filter === 'All' ? '/collection' : `/collection?${filter === 'Bridal' ? 'occasion' : 'category'}=${FILTER_MAP[filter] || filter.toLowerCase()}`}
              id={`filter-${filter.toLowerCase()}`}
              className={`px-6 py-2 font-body text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-charcoal text-ivory shadow-luxury-sm'
                  : 'border border-sand text-charcoal/60 hover:border-gold hover:text-gold'
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Link>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="product-card gold-border-card"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] img-zoom bg-sand/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.badge && (
                      <span className="badge-gold">{product.badge}</span>
                    )}
                    {product.originalPrice && (
                      <span className="badge-sale">
                        -{discountPercent(product.originalPrice, product.price)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleWishlist(product.id)
                    }}
                    className="wishlist-btn"
                    aria-label={`${isWishlisted(product.id) ? 'Remove from' : 'Add to'} wishlist`}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={isWishlisted(product.id) ? '#B76E79' : 'none'}
                      stroke={isWishlisted(product.id) ? '#B76E79' : 'currentColor'}
                    />
                  </button>

                  {/* Quick View */}
                  <Link
                    to={`/product/${product.slug}`}
                    className="absolute top-3 left-10 z-10 p-2 rounded-full bg-white/90 shadow-luxury-sm
                               opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-8
                               transition-all duration-400 hover:bg-gold hover:text-ivory ml-2"
                    aria-label="Quick view"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  {/* Quick Add bar */}
                  <button
                    className="quick-add-bar"
                    onClick={(e) => {
                      e.preventDefault()
                      handleAddToCart(product)
                    }}
                    id={`add-to-cart-${product.id}`}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </span>
                  </button>
                </div>

                {/* Product Info */}
                <Link to={`/product/${product.slug}`} className="block p-4">
                  {/* Type label */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-body text-2xs tracking-widest text-gold uppercase font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {product.metal}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="font-display text-lg font-light text-charcoal leading-snug mb-3 group-hover:text-gold transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-sand fill-sand'}`}
                        />
                      ))}
                    </div>
                    <span className="font-body text-2xs text-charcoal/50">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="price-main">{formatINR(product.price)}</span>
                    {product.originalPrice && (
                      <span className="price-original">{formatINR(product.originalPrice)}</span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All */}
        <div className="text-center mt-14">
          <Link to="/collection" id="view-all-collections" className="btn-outline-gold">
            View All Designs
          </Link>
        </div>
      </div>
    </section>
  )
}
