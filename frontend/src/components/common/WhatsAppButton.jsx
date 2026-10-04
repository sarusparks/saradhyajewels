import { MessageCircle } from 'lucide-react'
import { BRAND } from '@/utils/constants'

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hello Saradhya Jewels! I would like personal assistance with jewellery selection.")
  const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${message}`

  return (
    <aside aria-label="Personal Jewellery Concierge" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
        title="Chat with our Jewellery Expert"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          Jewellery Concierge
        </span>
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
      </a>
    </aside>
  )
}
