import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import SearchModal from '@/components/common/SearchModal'
import WhatsAppButton from '@/components/common/WhatsAppButton'
import Home from '@/pages/Home'
import CollectionPage from '@/pages/CollectionPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import PlaceholderPage from '@/pages/PlaceholderPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal font-sans selection:bg-gold/30 selection:text-charcoal">
      <ScrollToTop />

      {/* Global Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: '#1A1A2E',
            color: '#FBF7F0',
            border: '1px solid #C9A227',
            padding: '12px 18px',
            fontSize: '13px',
            fontFamily: 'Montserrat, sans-serif',
          },
          iconTheme: {
            primary: '#C9A227',
            secondary: '#1A1A2E',
          },
        }}
      />

      {/* Persistent Navigation Header */}
      <Header />

      {/* Route Views */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/collections" element={<CollectionPage />} />
          <Route path="/gold" element={<PlaceholderPage title="Gold Jewellery Collection" phase="Phase 2" />} />
          <Route path="/silver" element={<PlaceholderPage title="925 Sterling Silver" phase="Phase 2" />} />
          <Route path="/artificial" element={<PlaceholderPage title="Fashion & Kundan Jewellery" phase="Phase 2" />} />
          <Route path="/bridal" element={<PlaceholderPage title="Bridal Heritage Trousseau" phase="Phase 2" />} />
          <Route path="/occasion/:slug" element={<PlaceholderPage phase="Phase 2" />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/wishlist" element={<PlaceholderPage title="Your Wishlist" phase="Phase 4" />} />
          <Route path="/cart" element={<PlaceholderPage title="Shopping Bag" phase="Phase 4" />} />
          <Route path="/checkout" element={<PlaceholderPage title="Secure Checkout" phase="Phase 5" />} />
          <Route path="/profile" element={<PlaceholderPage title="Customer Account" phase="Phase 3" />} />
          <Route path="/auth/:action" element={<PlaceholderPage title="Authentication" phase="Phase 3" />} />
          <Route path="/gold-silver-rates" element={<PlaceholderPage title="Live Bullion Rates & Charts" phase="Phase 2" />} />
          <Route path="*" element={<PlaceholderPage title="Page Not Found" phase="Roadmap" />} />
        </Routes>
      </div>

      {/* Interactive Drawers & Overlays */}
      <CartDrawer />
      <SearchModal />
      <WhatsAppButton />

      {/* Footer */}
      <Footer />
    </div>
  )
}
