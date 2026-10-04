import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ─── Cart Store ───────────────────────────────────────────────────
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      guestSessionId: null,

      addItem: (item) => {
        const items = get().items
        const existing = items.find(
          (i) => i.productId === item.productId && i.variantId === item.variantId
        )
        if (existing) {
          set({ items: items.map((i) => i.productId === item.productId && i.variantId === item.variantId ? { ...i, qty: i.qty + item.qty } : i) })
        } else {
          set({ items: [...items, { ...item, cartItemId: crypto.randomUUID() }] })
        }
      },

      removeItem: (cartItemId) => set({ items: get().items.filter((i) => i.cartItemId !== cartItemId) }),

      updateQty: (cartItemId, qty) => {
        if (qty <= 0) return get().removeItem(cartItemId)
        set({ items: get().items.map((i) => i.cartItemId === cartItemId ? { ...i, qty } : i) })
      },

      clearCart: () => set({ items: [], coupon: null }),

      applyCoupon: (coupon) => set({ coupon }),
      removeCoupon: () => set({ coupon: null }),

      get totalItems() { return get().items.reduce((sum, i) => sum + i.qty, 0) },
      get subtotal() { return get().items.reduce((sum, i) => sum + i.price * i.qty, 0) },
    }),
    { name: 'saradhya-cart', version: 1 }
  )
)

// ─── Auth Store ───────────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'saradhya-auth', version: 1 }
  )
)

// ─── Wishlist Store ───────────────────────────────────────────────
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      toggleWishlist: (productId) => {
        const items = get().items
        if (items.includes(productId)) {
          set({ items: items.filter((id) => id !== productId) })
        } else {
          set({ items: [...items, productId] })
        }
      },

      isWishlisted: (productId) => get().items.includes(productId),
    }),
    { name: 'saradhya-wishlist', version: 1 }
  )
)

// ─── UI Store ─────────────────────────────────────────────────────
export const useUIStore = create((set) => ({
  isCartOpen: false,
  isMobileNavOpen: false,
  isSearchOpen: false,
  activeModal: null,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),

  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),
  toggleMobileNav: () => set((s) => ({ isMobileNavOpen: !s.isMobileNavOpen })),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}))
