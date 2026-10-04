import Hero from './home/Hero'
import ShopByOccasion from './home/ShopByOccasion'
import ShopByMetal from './home/ShopByMetal'
import FestiveBanner from './home/FestiveBanner'
import FeaturedCollections from './home/FeaturedCollections'
import TrustBadges from './home/TrustBadges'
import Testimonials from './home/Testimonials'
import Newsletter from './home/Newsletter'

export default function Home() {
  return (
    <main id="main-content" className="w-full overflow-hidden">
      <Hero />
      <ShopByOccasion />
      <ShopByMetal />
      <FestiveBanner />
      <FeaturedCollections />
      <TrustBadges />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
