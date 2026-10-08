import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  ChevronRight,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  Share2,
  Info,
  ArrowLeft,
} from 'lucide-react'

import { ALL_PRODUCTS } from '@/data/productsData'
import { FEATURED_PRODUCTS } from '@/utils/constants'
import { formatINR, calcJewelryPrice, discountPercent } from '@/utils/currency'
import { useWishlistStore } from '@/store'
import { useAddToCartWithAuth } from '@/hooks/useAddToCartWithAuth'
import ProductCard from '@/components/collection/ProductCard'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  // Find product by slug
  const product = useMemo(() => {
    return (
      ALL_PRODUCTS.find((p) => p.slug === slug) ||
      FEATURED_PRODUCTS.find((p) => p.slug === slug) ||
      ALL_PRODUCTS[0]
    )
  }, [slug])

  // Active gallery image
  const [selectedImage, setSelectedImage] = useState(product.image)

  // Selected size
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  )

  // Quantity
  const [qty, setQty] = useState(1)

  // Pincode checker
  const [pincode, setPincode] = useState('')
  const [deliveryEstimate, setDeliveryEstimate] = useState(null)

  // Active tab
  const [activeTab, setActiveTab] = useState('specifications')

  // Stores
  const { addToCart } = useAddToCartWithAuth()
  const { toggleWishlist, isWishlisted } = useWishlistStore()

  const wishlisted = isWishlisted(product.id)

  // Related products
  const relatedProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(
      (p) => p.id !== product.id && (p.category === product.category || p.materialGroup === product.materialGroup)
    ).slice(0, 4)
  }, [product])

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: `${product.id}-${selectedSize || 'default'}`,
      name: product.name,
      price: product.price,
      image: product.image,
      metal: product.material,
      karat: product.purity,
      qty,
    })
  }

  const handleCheckPincode = (e) => {
    e.preventDefault()
    if (pincode.trim().length === 6) {
      setDeliveryEstimate({
        date: 'Wednesday, Delivery in 2-3 business days',
        isFree: true,
      })
      toast.success('Serviceable location! Express insured delivery available.')
    } else {
      toast.error('Please enter a valid 6-digit Indian PIN code')
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this stunning ${product.name} from Saradhya Jewels`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Product link copied to clipboard!')
    }
  }

  return (
    <div className="bg-ivory min-h-screen py-8 sm:py-12">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        {/* ── Breadcrumb Navigation ── */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-body text-charcoal/60">
            <li>
              <Link to="/" className="hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-gold/60" />
            </li>
            <li>
              <Link to="/collection" className="hover:text-gold transition-colors">
                Collection
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-gold/60" />
            </li>
            <li>
              <Link
                to={`/collection?category=${product.category}`}
                className="hover:text-gold transition-colors capitalize"
              >
                {product.categoryLabel || product.category}
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-gold/60" />
            </li>
            <li className="text-gold font-semibold truncate max-w-xs">{product.name}</li>
          </ol>
        </nav>

        {/* ── Main Product Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* ── Left Column: Media Gallery (7 cols) ── */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Strip */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible shrink-0">
              <button
                onClick={() => setSelectedImage(product.image)}
                className={`w-16 h-20 sm:w-20 sm:h-24 border-2 overflow-hidden transition-all bg-sand/30 shrink-0 ${
                  selectedImage === product.image ? 'border-gold shadow-gold-sm' : 'border-sand opacity-70 hover:opacity-100'
                }`}
              >
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </button>

              {product.secondaryImage && (
                <button
                  onClick={() => setSelectedImage(product.secondaryImage)}
                  className={`w-16 h-20 sm:w-20 sm:h-24 border-2 overflow-hidden transition-all bg-sand/30 shrink-0 ${
                    selectedImage === product.secondaryImage ? 'border-gold shadow-gold-sm' : 'border-sand opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={product.secondaryImage} alt="" className="w-full h-full object-cover" />
                </button>
              )}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[4/5] bg-sand/20 overflow-hidden border border-sand shadow-sm group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  if (product.fallbackImage) e.currentTarget.src = product.fallbackImage
                }}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.badge && <span className="badge-gold font-semibold">{product.badge}</span>}
                {product.discount > 0 && <span className="badge-sale">{product.discount}% OFF</span>}
              </div>

              {/* Hallmark Watermark */}
              <div className="absolute bottom-4 left-4 bg-charcoal/80 backdrop-blur-sm text-ivory text-2xs px-3 py-1.5 flex items-center gap-1.5 border border-gold/40">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>BIS 916 Hallmarked Gold Guarantee</span>
              </div>
            </div>
          </div>

          {/* ── Right Column: Product Details & Purchase Actions (5 cols) ── */}
          <div className="lg:col-span-5 bg-white border border-sand p-6 sm:p-8 shadow-luxury-xs">
            {/* Purity & Category Header */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-body text-xs font-semibold uppercase tracking-widest-2 text-gold">
                {product.material} · {product.purity}
              </span>
              <button
                onClick={handleShare}
                className="p-1.5 text-charcoal/50 hover:text-gold transition-colors"
                title="Share this design"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Product Title */}
            <h1 className="font-display text-2xl sm:text-3xl font-light text-charcoal leading-snug mb-3">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-sand/60">
                <div className="flex items-center gap-1 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-sand fill-sand'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-body text-xs font-bold text-charcoal">{product.rating}</span>
                <span className="font-body text-xs text-charcoal/50">
                  · {product.reviewsCount} Verified Buyer Reviews
                </span>
              </div>
            )}

            {/* Price block */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="font-body text-2xl sm:text-3xl font-bold text-charcoal">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="font-body text-base text-charcoal/40 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    Save {discountPercent(product.originalPrice, product.price)}%
                  </span>
                )}
              </div>
              <p className="font-body text-2xs text-charcoal/50 mt-1">
                Inclusive of all taxes (3% GST) · Transparent making charges
              </p>
            </div>

            {/* Description */}
            <p className="font-body text-xs sm:text-sm text-charcoal/70 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Size Options (if available) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6 pt-4 border-t border-sand/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-charcoal">
                    Select Size
                  </span>
                  <span className="font-body text-2xs text-gold underline cursor-pointer">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-2 text-xs font-medium border transition-all ${
                        selectedSize === sz
                          ? 'bg-charcoal text-gold border-charcoal font-semibold shadow-xs'
                          : 'border-sand text-charcoal/80 hover:border-gold'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Bag */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-sand bg-ivory">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-charcoal/70 hover:text-gold"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-charcoal">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2 text-charcoal/70 hover:text-gold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag CTA */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest hover:bg-gold hover:text-charcoal transition-all flex items-center justify-center gap-2 shadow-luxury-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Shopping Bag
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3.5 border border-sand hover:border-rose-gold text-charcoal transition-colors shrink-0"
                  aria-label={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlisted ? 'fill-rose-gold text-rose-gold' : 'text-charcoal/60'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Pincode & Delivery Checker */}
            <div className="p-4 bg-sand/30 border border-sand/80 mb-6">
              <span className="block font-body text-xs font-semibold text-charcoal mb-2">
                Estimated Delivery & Pincode Check
              </span>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN code"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 px-3 py-2 text-xs border border-sand bg-white focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-charcoal text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-gold hover:text-charcoal transition-colors"
                >
                  Check
                </button>
              </form>
              {deliveryEstimate && (
                <div className="mt-2.5 flex items-center gap-2 text-xs text-emerald-800">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{deliveryEstimate.date}</span>
                </div>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="space-y-2 pt-2 border-t border-sand/50 text-2xs text-charcoal/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
                <span>100% Certified BIS 916 Hallmarked Jewellery</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-gold shrink-0" />
                <span>Free Insured Transit across India</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-gold shrink-0" />
                <span>30-Day Easy Exchange Policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Product Specifications & Details Tabs ── */}
        <div className="bg-white border border-sand p-6 sm:p-8 mb-16">
          <div className="flex items-center gap-6 border-b border-sand pb-4 mb-6 overflow-x-auto no-scrollbar">
            {['specifications', 'hallmarking', 'shipping', 'care'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-body text-xs font-semibold uppercase tracking-widest whitespace-nowrap pb-2 -mb-4 transition-colors ${
                  activeTab === tab
                    ? 'text-gold border-b-2 border-gold font-bold'
                    : 'text-charcoal/50 hover:text-charcoal'
                }`}
              >
                {tab === 'specifications'
                  ? 'Product Specifications'
                  : tab === 'hallmarking'
                  ? 'Hallmarking & Purity'
                  : tab === 'shipping'
                  ? 'Shipping & Returns'
                  : 'Jewellery Care'}
              </button>
            ))}
          </div>

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
              <div className="flex justify-between py-2 border-b border-sand/40">
                <span className="text-charcoal/50">Product Code</span>
                <span className="font-semibold text-charcoal font-mono uppercase">{product.slug}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-sand/40">
                <span className="text-charcoal/50">Metal & Purity</span>
                <span className="font-semibold text-charcoal">{product.purity || product.material}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-sand/40">
                <span className="text-charcoal/50">Gross Weight</span>
                <span className="font-semibold text-charcoal">{product.grossWeight || product.weight || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-sand/40">
                <span className="text-charcoal/50">Net Metal Weight</span>
                <span className="font-semibold text-charcoal">{product.netWeight || product.weight || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-sand/40">
                <span className="text-charcoal/50">Gemstone Details</span>
                <span className="font-semibold text-charcoal">{product.gemstone}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-sand/40">
                <span className="text-charcoal/50">Occasion</span>
                <span className="font-semibold text-charcoal">{product.occasion}</span>
              </div>
            </div>
          )}

          {activeTab === 'hallmarking' && (
            <div className="space-y-4 text-xs text-charcoal/70 leading-relaxed max-w-3xl">
              <p>
                Every gold piece at <strong>Saradhya Jewels</strong> is certified by the Bureau of Indian
                Standards (BIS). The hallmark consists of three distinct laser stamps: the BIS logo, the
                fineness/purity degree (e.g. 916 for 22 Karat gold, 750 for 18 Karat gold), and a 6-digit
                alphanumeric HUID (Hallmark Unique Identification) code.
              </p>
              <p>
                You can verify the authentic HUID on the official BIS Care app for complete peace of
                mind regarding metal purity and trade integrity.
              </p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4 text-xs text-charcoal/70 leading-relaxed max-w-3xl">
              <p>
                <strong>Complimentary Insured Shipping:</strong> All jewelry shipments are fully insured
                from our vault right up to the moment you sign for receipt. Packed in discreet, tamper-evident
                luxury presentation boxes.
              </p>
              <p>
                <strong>30-Day Hassle-Free Exchange:</strong> If you are not completely delighted with your
                order, you may request an exchange or return within 30 days of delivery.
              </p>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="space-y-4 text-xs text-charcoal/70 leading-relaxed max-w-3xl">
              <p>
                • Store each piece individually in the provided velvet-lined Saradhya pouch to avoid surface scratches.
              </p>
              <p>
                • Keep your fine jewellery away from perfumes, hairsprays, lotions, and abrasive detergents.
              </p>
              <p>
                • Clean gently with lukewarm water and a soft microfiber cloth. Complimentary annual inspection
                and polishing is available at any of our flagship stores.
              </p>
            </div>
          )}
        </div>

        {/* ── Related Designs Section ── */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <div className="text-center mb-10">
              <span className="section-label">Curated Pairings</span>
              <h2 className="section-title">
                Complete Your <span className="text-gold-gradient italic">Ensemble</span>
              </h2>
              <div className="gold-divider mt-4" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/collection" className="btn-outline-gold">
                View All Jewellery Collections
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
