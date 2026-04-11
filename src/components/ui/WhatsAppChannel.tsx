import { MessageCircle } from 'lucide-react';

interface Props {
  href?: string;
  label?: string;
  className?: string;
}

/**
 * WhatsApp community/channel CTA button.
 * Point `href` to your WhatsApp channel URL once created at whatsapp.com/channel.
 */
export default function WhatsAppChannel({
  href = 'https://whatsapp.com/channel/droneagricol',
  label = 'Canal WhatsApp',
  className = '',
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1ebe5b] transition-colors ${className}`}
    >
      <MessageCircle className="w-4 h-4" />
      {label}
    </a>
  );
}
