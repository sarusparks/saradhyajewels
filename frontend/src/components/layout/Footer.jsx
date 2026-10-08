import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, Heart } from 'lucide-react'
import { BRAND } from '@/utils/constants'

const footerNav = {
  'Collections': [
    { label: 'Gold Jewellery', href: '/gold' },
    { label: 'Silver Jewellery', href: '/silver' },
    { label: 'Fashion Jewellery', href: '/artificial' },
    { label: 'Bridal Sets', href: '/bridal' },
    { label: 'Jewellery Rentals', href: '/rentals' },
    { label: 'New Arrivals', href: '/new' },
    { label: 'Bestsellers', href: '/bestsellers' },
  ],
  'Shop By Occasion': [
    { label: 'Wedding', href: '/occasion/wedding' },
    { label: 'Festive', href: '/occasion/festive' },
    { label: 'Daily Wear', href: '/occasion/daily' },
    { label: 'Office Wear', href: '/occasion/office' },
    { label: 'Gifting', href: '/occasion/gifting' },
  ],
  'Customer Care': [
    { label: 'My Orders', href: '/orders' },
    { label: 'Track Order', href: '/track' },
    { label: 'Returns & Exchanges', href: '/returns' },
    { label: 'Ring Size Guide', href: '/size-guide' },
    { label: 'Custom Orders', href: '/custom-order' },
    { label: 'Gold Rate Today', href: '/gold-rates' },
  ],
  'Company': [
    { label: 'About Us', href: '/about' },
    { label: 'Blog & Lookbook', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory" role="contentinfo">
      {/* ── Trust Strip ── */}
      <div className="border-b border-ivory/10">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🔏', text: 'BIS Hallmarked' },
              { icon: '🚚', text: 'Free Insured Shipping' },
              { icon: '🔒', text: 'Secure Payments' },
              { icon: '🔄', text: '30-Day Returns' },
            ].map((item) => (
              <div key={item.text} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-body text-xs font-semibold tracking-wider text-ivory/70 uppercase">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="font-display text-4xl font-light tracking-wide text-ivory">Saradhya</span>
              <br />
              <span className="font-body text-2xs font-semibold tracking-widest-3 text-gold uppercase">
                Jewels
              </span>
            </div>
            <p className="font-body text-sm text-ivory/55 leading-relaxed mb-6 max-w-xs">
              Crafting timeless jewellery for three generations. Where heritage meets modern artistry — every piece tells a story.
            </p>

            {/* Contact */}
            <div className="space-y-3 mb-8">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 text-sm text-ivory/60 hover:text-gold transition-colors group">
                <Phone className="w-4 h-4 text-gold/70 group-hover:text-gold shrink-0" />
                {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-sm text-ivory/60 hover:text-gold transition-colors group">
                <Mail className="w-4 h-4 text-gold/70 group-hover:text-gold shrink-0" />
                {BRAND.email}
              </a>
              <div className="flex items-start gap-3 text-sm text-ivory/60">
                <MapPin className="w-4 h-4 text-gold/70 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{BRAND.address}</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { href: BRAND.instagram, Icon: Instagram, label: 'Instagram' },
                { href: BRAND.facebook, Icon: Facebook, label: 'Facebook' },
                { href: BRAND.youtube, Icon: Youtube, label: 'YouTube' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-ivory/20 flex items-center justify-center text-ivory/50 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading} className="lg:col-span-1">
              <h3 className="font-body text-xs font-semibold tracking-widest uppercase text-gold mb-5">
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-ivory/55 hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Gold divider */}
      <div className="gold-divider-full opacity-30" />

      {/* ── Bottom Bar ── */}
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-ivory/40">
            © {new Date().getFullYear()} Saradhya Jewels. All rights reserved.
          </p>
          <p className="font-body text-xs text-ivory/40 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-gold" fill="currentColor" /> in India
          </p>
          <div className="flex items-center gap-2">
            {/* Payment logos as text badges */}
            {['UPI', 'Visa', 'Mastercard', 'Razorpay', 'COD'].map((p) => (
              <span
                key={p}
                className="px-2 py-1 border border-ivory/15 text-ivory/40 text-2xs font-medium rounded-sm"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
