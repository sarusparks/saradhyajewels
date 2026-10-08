import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingBag, Star, ShieldCheck, Check, ArrowRight } from 'lucide-react'
import { formatINR } from '@/utils/currency'
import { useWishlistStore } from '@/store'
import { useAddToCartWithAuth } from '@/hooks/useAddToCartWithAuth'
import toast from 'react-hot-toast'

export default function QuickViewModal({ product, onClose }) {
  if (!product) return null

  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  )
  const [selectedImg, setSelectedImg] = useState(product.image)
  const [isAdding, setIsAdding] = useState(false)

  const { toggleWishlist, isWishlisted } = useWishlistStore()
  const { addToCart } = useAddToCartWithAuth()

  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = () => {
    setIsAdding(true)
    onClose()
    addToCart({
      productId: product.id,
      variantId: `${product.id}-${selectedSize || 'default'}`,
      name: product.name,
      price: product.price,
      image: product.image,
      metal: product.material,
      karat: product.purity,
      qty: 1,
    })

    setTimeout(() => {
      setIsAdding(false)
    }, 400)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-ivory w-full max-w-3xl overflow-hidden shadow-2xl border border-sand z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-charcoal hover:text-gold shadow-sm transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery */}
            <div className="p-6 bg-sand/30 flex flex-col justify-between">
              <div className="relative aspect-square overflow-hidden bg-white mb-4">
                <img
                  src={selectedImg}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 badge-gold font-semibold">
                    {product.badge}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="absolute bottom-3 left-3 badge-sale">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails if secondary exists */}
              {product.secondaryImage && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedImg(product.image)}
                    className={`w-16 h-16 border-2 overflow-hidden ${
                      selectedImg === product.image ? 'border-gold' : 'border-sand'
                    }`}
                  >
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </button>
                  <button
                    onClick={() => setSelectedImg(product.secondaryImage)}
                    className={`w-16 h-16 border-2 overflow-hidden ${
                      selectedImg === product.secondaryImage ? 'border-gold' : 'border-sand'
                    }`}
                  >
                    <img src={product.secondaryImage} alt="" className="w-full h-full object-cover" />
                  </button>
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-xs font-semibold text-gold tracking-widest-2 uppercase">
                    {product.material}
                  </span>
                  {product.rating && (
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-charcoal/40">({product.reviewsCount})</span>
                    </div>
                  )}
                </div>

                <h3 className="font-display text-2xl font-light text-charcoal leading-snug mb-3">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-body text-2xl font-bold text-charcoal">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-body text-sm text-charcoal/40 line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="font-body text-xs text-charcoal/70 leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Available Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-5">
                    <label className="block font-body text-2xs uppercase tracking-wider text-charcoal/60 mb-2 font-semibold">
                      Select Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                            selectedSize === sz
                              ? 'bg-charcoal text-gold border-charcoal font-semibold'
                              : 'border-sand text-charcoal/80 hover:border-gold'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hallmarking guarantee */}
                <div className="flex items-center gap-2 text-2xs text-charcoal/70 mb-6 py-2 px-3 bg-sand/30 border border-sand">
                  <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                  <span>BIS Hallmarked Purity Guaranteed · Free Insured Transit</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="flex-1 py-3.5 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-colors flex items-center justify-center gap-2 shadow-luxury-sm"
                  >
                    {isAdding ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" /> Added!
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-3.5 border border-sand hover:border-rose-gold text-charcoal transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        wishlisted ? 'fill-rose-gold text-rose-gold' : 'text-charcoal/70'
                      }`}
                    />
                  </button>
                </div>

                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="w-full py-2.5 text-center text-xs font-semibold text-charcoal/70 hover:text-gold uppercase tracking-wider flex items-center justify-center gap-1"
                >
                  View Complete Product Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
