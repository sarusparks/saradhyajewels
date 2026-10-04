import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react'
import { useCartStore, useUIStore } from '@/store'
import { formatINR } from '@/utils/currency'

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUIStore()
  const { items, removeItem, updateQty } = useCartStore()

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0)
  const freeShippingThreshold = 50000
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100)
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-ivory text-charcoal shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-sand bg-white/70 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-gold" />
                  <h2 className="font-serif text-xl font-bold tracking-wide">Your Shopping Bag</h2>
                  <span className="text-xs bg-gold/15 text-gold font-semibold px-2 py-0.5 rounded-full">
                    {items.reduce((acc, i) => acc + i.qty, 0)}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-sand/60 text-charcoal/60 hover:text-charcoal transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free shipping banner */}
              <div className="bg-sand/50 px-6 py-3 border-b border-sand/70 text-xs text-charcoal/80">
                {remainingForFreeShipping > 0 ? (
                  <div>
                    <span>Add <strong className="text-gold font-bold">{formatINR(remainingForFreeShipping)}</strong> more for <strong>Free Insured Shipping</strong></span>
                    <div className="w-full bg-sand h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-gold h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressToFreeShipping}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Unlocked: <strong>Free Insured Express Delivery & Hallmark Assurance</strong></span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-sand/60 flex items-center justify-center text-charcoal/40">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="font-serif text-lg text-charcoal/70">Your jewellery bag is empty</p>
                    <p className="text-xs text-charcoal/50 max-w-xs mx-auto">
                      Explore our handcrafted gold, silver and heirloom bridal collections.
                    </p>
                    <button
                      onClick={closeCart}
                      className="inline-block mt-2 px-6 py-2.5 bg-gold text-charcoal font-medium text-xs tracking-wider uppercase rounded hover:bg-gold-light transition-colors"
                    >
                      Start Exploring
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.cartItemId || item.productId}
                      className="flex gap-4 p-3 bg-white rounded-lg border border-sand/60 shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded bg-sand/20 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-serif text-sm font-semibold truncate text-charcoal">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.cartItemId)}
                            className="text-charcoal/40 hover:text-ruby transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.karat && (
                          <span className="inline-block text-[10px] uppercase font-semibold text-gold bg-gold/10 px-1.5 py-0.5 rounded mt-0.5">
                            {item.karat} {item.metal}
                          </span>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <span className="font-bold text-sm text-charcoal">
                            {formatINR(item.price * item.qty)}
                          </span>

                          <div className="flex items-center border border-sand rounded bg-ivory">
                            <button
                              onClick={() => updateQty(item.cartItemId, item.qty - 1)}
                              className="p-1 hover:bg-sand/60 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3 text-charcoal/70" />
                            </button>
                            <span className="px-2 text-xs font-semibold">{item.qty}</span>
                            <button
                              onClick={() => updateQty(item.cartItemId, item.qty + 1)}
                              className="p-1 hover:bg-sand/60 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3 text-charcoal/70" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Checkout Summary */}
              {items.length > 0 && (
                <div className="p-6 border-t border-sand bg-white space-y-4">
                  <div className="space-y-1.5 text-xs text-charcoal/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-charcoal">{formatINR(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated GST (3%)</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insured Shipping</span>
                      <span className="text-emerald font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-charcoal pt-2 border-t border-sand">
                      <span>Total Amount</span>
                      <span className="text-gold">{formatINR(subtotal)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link
                      to="/checkout"
                      onClick={closeCart}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-gold text-charcoal font-semibold text-xs tracking-widest uppercase rounded shadow hover:bg-gold-light transition-all"
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={closeCart}
                      className="w-full text-center text-xs text-charcoal/60 hover:text-charcoal py-1 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
