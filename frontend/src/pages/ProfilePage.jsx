// src/pages/ProfilePage.jsx — User Profile & Account Page
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  ShoppingBag,
  Heart,
  LogOut,
  ShieldCheck,
  Package,
  Sparkles,
  MapPin,
  ArrowRight
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore, useCartStore, useWishlistStore } from '@/store'
import { logoutUser } from '@/services/firebase'

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const { items: cartItems } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (!user) return null

  const handleLogout = async () => {
    try {
      await logoutUser()
      logout()
      toast.success('Signed out successfully.')
      navigate('/')
    } catch (err) {
      toast.error('Failed to log out.')
    }
  }

  return (
    <main className="min-h-[80vh] bg-ivory py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card Header */}
        <div className="bg-white rounded-2xl border border-sand shadow-luxury p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="w-20 h-20 rounded-full bg-charcoal text-gold font-display text-2xl font-light flex items-center justify-center border-2 border-gold shadow-md shrink-0">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-3xs uppercase tracking-widest text-gold font-bold">
                  Royal Member
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
              <h1 className="font-display text-2xl font-medium text-charcoal">
                {user.displayName || 'Saradhya Member'}
              </h1>
              <p className="font-body text-xs text-charcoal/60 mt-0.5">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-lg border border-sand hover:border-red-300 hover:bg-red-50 text-charcoal/70 hover:text-red-700 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl border border-sand shadow-luxury-sm flex items-center justify-between">
            <div>
              <p className="text-3xs uppercase tracking-wider text-charcoal/50 font-semibold">Shopping Bag</p>
              <h3 className="font-display text-2xl font-bold text-charcoal mt-1">
                {cartItems.reduce((s, i) => s + i.qty, 0)} Items
              </h3>
            </div>
            <Link to="/cart" className="p-3 rounded-full bg-sand/30 text-gold hover:bg-gold hover:text-charcoal transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>

          <div className="p-6 bg-white rounded-xl border border-sand shadow-luxury-sm flex items-center justify-between">
            <div>
              <p className="text-3xs uppercase tracking-wider text-charcoal/50 font-semibold">Saved Wishlist</p>
              <h3 className="font-display text-2xl font-bold text-charcoal mt-1">
                {wishlistItems.length} Items
              </h3>
            </div>
            <Link to="/wishlist" className="p-3 rounded-full bg-sand/30 text-rose-gold hover:bg-rose-gold hover:text-ivory transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
          </div>

          <div className="p-6 bg-white rounded-xl border border-sand shadow-luxury-sm flex items-center justify-between">
            <div>
              <p className="text-3xs uppercase tracking-wider text-charcoal/50 font-semibold">Reward Points</p>
              <h3 className="font-display text-2xl font-bold text-charcoal mt-1">
                250 Pts
              </h3>
            </div>
            <div className="p-3 rounded-full bg-gold/15 text-gold-dark">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Account Quick Links */}
        <div className="bg-white rounded-2xl border border-sand shadow-luxury-sm overflow-hidden">
          <div className="p-6 border-b border-sand">
            <h2 className="font-display text-lg font-medium text-charcoal">Quick Account Actions</h2>
          </div>
          <div className="divide-y divide-sand/60">
            <Link
              to="/collection"
              className="p-5 flex items-center justify-between hover:bg-sand/20 transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <Package className="w-5 h-5 text-gold" />
                <div>
                  <h4 className="font-display text-sm font-medium text-charcoal">Explore Fine Jewellery</h4>
                  <p className="text-2xs text-charcoal/60">Browse 1 Gram Gold & Temple jewellery catalog</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-charcoal/40 group-hover:translate-x-1 group-hover:text-gold transition-all" />
            </Link>

            <Link
              to="/rentals"
              className="p-5 flex items-center justify-between hover:bg-sand/20 transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <Sparkles className="w-5 h-5 text-gold" />
                <div>
                  <h4 className="font-display text-sm font-medium text-charcoal">Bridal & Event Rentals</h4>
                  <p className="text-2xs text-charcoal/60">Rent royal sets starting at ₹599/day</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-charcoal/40 group-hover:translate-x-1 group-hover:text-gold transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
