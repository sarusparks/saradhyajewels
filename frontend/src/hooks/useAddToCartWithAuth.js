// src/hooks/useAddToCartWithAuth.js — Cart addition guard requiring Firebase authentication
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuthStore, useCartStore, useUIStore } from '@/store'

export function useAddToCartWithAuth() {
  const { isAuthenticated, setPendingCartItem } = useAuthStore()
  const { addItem } = useCartStore()
  const { openCart } = useUIStore()
  const navigate = useNavigate()
  const location = useLocation()

  const addToCart = (item) => {
    if (!isAuthenticated) {
      // Save product item for auto-addition post-authentication
      setPendingCartItem(item)
      toast('Please sign in or create an account to add items to your cart', {
        icon: '🔐',
        style: {
          background: '#1A1A2E',
          color: '#FBF7F0',
          border: '1px solid #C9A227',
          padding: '12px 18px',
          fontSize: '13px',
        },
      })
      navigate(`/auth/login?redirect=${encodeURIComponent(location.pathname + location.search)}`)
      return false
    }

    addItem(item)
    toast.success(`${item.name} added to cart!`, {
      style: { background: '#1A1A2E', color: '#FBF7F0', border: '1px solid #C9A227' },
      iconTheme: { primary: '#C9A227', secondary: '#1A1A2E' },
    })
    openCart()
    return true
  }

  return { addToCart }
}
