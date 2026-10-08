// src/pages/AuthPage.jsx — Saradhya Jewels Firebase Authentication
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, useSearchParams, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  sendResetPassword
} from '@/services/firebase'
import { useAuthStore, useCartStore, useUIStore } from '@/store'

export default function AuthPage() {
  const { action } = useParams() // e.g. /auth/login or /auth/signup
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()

  // Tab state: 'login' | 'signup' | 'reset'
  const initialMode = action === 'signup' || location.pathname === '/signup'
    ? 'signup'
    : action === 'reset'
    ? 'reset'
    : 'login'

  const [mode, setMode] = useState(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [agreedTerms, setAgreedTerms] = useState(true)

  const { isAuthenticated, pendingCartItem, clearPendingCartItem, user } = useAuthStore()
  const { addItem } = useCartStore()
  const { openCart } = useUIStore()

  const redirectUrl = searchParams.get('redirect') || '/'

  // Update mode if URL param changes
  useEffect(() => {
    if (action === 'signup' || location.pathname === '/signup') setMode('signup')
    else if (action === 'reset') setMode('reset')
    else if (action === 'login' || location.pathname === '/login') setMode('login')
  }, [action, location.pathname])

  // If already authenticated and no pending item, redirect
  useEffect(() => {
    if (isAuthenticated && !pendingCartItem) {
      navigate(redirectUrl, { replace: true })
    }
  }, [isAuthenticated, pendingCartItem, navigate, redirectUrl])

  // Post-auth item addition handler
  const handleAuthSuccess = (authUser, isNew = false) => {
    if (pendingCartItem) {
      addItem(pendingCartItem)
      toast.success(`✨ "${pendingCartItem.name}" has been added to your shopping bag!`, {
        duration: 4000,
        style: {
          background: '#1A1A2E',
          color: '#FBF7F0',
          border: '1px solid #C9A227',
          padding: '14px 20px',
        },
      })
      clearPendingCartItem()
      openCart()
    } else {
      toast.success(
        isNew
          ? `Welcome to Saradhya Jewels, ${authUser.displayName || 'Valued Member'}!`
          : `Welcome back, ${authUser.displayName || 'Valued Member'}!`
      )
    }

    navigate(redirectUrl, { replace: true })
  }

  const mapFirebaseError = (err) => {
    const code = err.code || ''
    if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
      return 'Invalid email or password. Please verify and try again.'
    }
    if (code === 'auth/email-already-in-use') {
      return 'An account with this email already exists. Please sign in instead.'
    }
    if (code === 'auth/weak-password') {
      return 'Password should be at least 6 characters long.'
    }
    if (code === 'auth/invalid-email') {
      return 'Please enter a valid email address.'
    }
    if (code === 'auth/popup-closed-by-user') {
      return 'Google sign-in was cancelled.'
    }
    return err.message || 'Authentication failed. Please try again.'
  }

  // Handle Email Sign In
  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const res = await loginWithEmail(email.trim(), password)
      handleAuthSuccess(res.user, false)
    } catch (err) {
      setErrorMessage(mapFirebaseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Email Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!agreedTerms) {
      setErrorMessage('Please accept the Terms of Service to continue.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.')
      return
    }

    setIsLoading(true)
    try {
      const res = await registerWithEmail(email.trim(), password, fullName.trim())
      handleAuthSuccess(res.user, true)
    } catch (err) {
      setErrorMessage(mapFirebaseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google Auth
  const handleGoogleSignIn = async () => {
    setErrorMessage('')
    setIsLoading(true)
    try {
      const res = await loginWithGoogle()
      handleAuthSuccess(res.user, false)
    } catch (err) {
      setErrorMessage(mapFirebaseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Password Reset
  const handleResetPassword = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    if (!email.trim()) {
      setErrorMessage('Please enter your email address to receive reset instructions.')
      return
    }

    setIsLoading(true)
    try {
      await sendResetPassword(email.trim())
      toast.success('Password reset email sent! Check your inbox.')
      setMode('login')
    } catch (err) {
      setErrorMessage(mapFirebaseError(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-[85vh] bg-ivory flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">

        {/* ── Pending Cart Item Notice ── */}
        {pendingCartItem && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-charcoal text-ivory border border-gold/40 shadow-luxury flex items-center gap-3.5"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-gold/30 shrink-0 bg-sand/20">
              <img
                src={pendingCartItem.image}
                alt={pendingCartItem.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = '/images/gold-collection.jpg' }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-gold text-3xs uppercase tracking-widest font-semibold">
                <ShoppingBag className="w-3 h-3" />
                <span>Reserved for your cart</span>
              </div>
              <p className="font-display text-sm font-medium text-ivory truncate mt-0.5">
                {pendingCartItem.name}
              </p>
              <p className="text-2xs text-ivory/60">
                ₹{pendingCartItem.price?.toLocaleString('en-IN')} · Sign in to proceed to checkout
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Auth Card ── */}
        <div className="bg-white rounded-2xl border border-sand shadow-luxury-md overflow-hidden">
          {/* Card Header & Brand */}
          <div className="p-8 pb-6 text-center border-b border-sand/50 bg-sand/15">
            <Link to="/" className="inline-block group mb-2">
              <span className="font-display text-2xl font-light tracking-wider text-charcoal group-hover:text-gold transition-colors">
                Saradhya
              </span>
              <span className="font-body text-3xs font-semibold tracking-widest-3 text-gold uppercase block">
                Jewels
              </span>
            </Link>
            <h1 className="font-display text-xl font-medium text-charcoal mt-2">
              {mode === 'login'
                ? 'Welcome Back'
                : mode === 'signup'
                ? 'Create Your Account'
                : 'Reset Your Password'}
            </h1>
            <p className="font-body text-xs text-charcoal/60 mt-1">
              {mode === 'login'
                ? 'Access your saved jewellery, cart & order history'
                : mode === 'signup'
                ? 'Join Saradhya Jewels for exclusive bridal perks & offers'
                : 'Enter your email to receive a recovery link'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Hidden in reset mode) */}
          {mode !== 'reset' && (
            <div className="grid grid-cols-2 border-b border-sand bg-sand/30">
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMessage('') }}
                className={`py-3.5 text-xs font-semibold tracking-wider uppercase transition-colors text-center border-b-2 ${
                  mode === 'login'
                    ? 'border-gold text-charcoal bg-white font-bold'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setErrorMessage('') }}
                className={`py-3.5 text-xs font-semibold tracking-wider uppercase transition-colors text-center border-b-2 ${
                  mode === 'signup'
                    ? 'border-gold text-charcoal bg-white font-bold'
                    : 'border-transparent text-charcoal/60 hover:text-charcoal'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Card Body */}
          <div className="p-6 sm:p-8">
            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* ── GOOGLE ONE-CLICK SIGN IN ── */}
            {mode !== 'reset' && (
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-white border border-sand hover:border-gold hover:bg-sand/20 text-charcoal text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-3 shadow-2xs group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-sand" />
                  </div>
                  <span className="relative bg-white px-3 text-3xs uppercase tracking-widest text-charcoal/50">
                    or with email
                  </span>
                </div>
              </div>
            )}

            {/* ── SIGN IN FORM ── */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-2xs uppercase tracking-wider font-semibold text-charcoal/80 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-2xs uppercase tracking-wider font-semibold text-charcoal/80">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => { setMode('reset'); setErrorMessage('') }}
                      className="text-2xs text-gold hover:text-gold-dark transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-charcoal hover:bg-gold hover:text-charcoal text-ivory text-xs font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 shadow-luxury-sm mt-2 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ── SIGN UP FORM ── */}
            {mode === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-2xs uppercase tracking-wider font-semibold text-charcoal/80 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xs uppercase tracking-wider font-semibold text-charcoal/80 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xs uppercase tracking-wider font-semibold text-charcoal/80 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded border-sand text-gold focus:ring-gold"
                  />
                  <label htmlFor="terms" className="text-3xs text-charcoal/70 leading-normal">
                    I agree to the Terms of Service & Privacy Policy, and wish to receive member privilege offers.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-charcoal hover:bg-gold hover:text-charcoal text-ivory text-xs font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 shadow-luxury-sm mt-2 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ── FORGOT PASSWORD FORM ── */}
            {mode === 'reset' && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-2xs uppercase tracking-wider font-semibold text-charcoal/80 mb-1.5">
                    Account Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-sand rounded-lg focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-charcoal hover:bg-gold hover:text-charcoal text-ivory text-xs font-semibold tracking-widest uppercase rounded-lg transition-all duration-300 shadow-luxury-sm mt-2 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="inline-block w-4 h-4 border-2 border-ivory border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Send Reset Instructions</span>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setErrorMessage('') }}
                    className="text-xs text-charcoal/70 hover:text-gold transition-colors"
                  >
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer note */}
          <div className="px-6 py-4 bg-sand/20 border-t border-sand/50 text-center text-3xs text-charcoal/60">
            Protected by Firebase 256-bit SSL encryption.
          </div>
        </div>
      </div>
    </main>
  )
}
