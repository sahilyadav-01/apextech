import React from 'react';
import { MessageSquare, Send, Bell } from 'lucide-react';
import { Button } from './Button';

interface WhatsAppActionBtnProps {
  phone: string;
  customerName: string;
  bookingCode?: string;
  type?: 'chat' | 'quote' | 'reminder';
  amount?: number;
  size?: 'sm' | 'md';
}

export const WhatsAppActionBtn: React.FC<WhatsAppActionBtnProps> = ({
  phone,
  customerName,
  bookingCode = 'APX-2026-V3',
  type = 'chat',
  amount = 15000,
  size = 'sm'
}) => {
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  let message = `Hello ${customerName}, greeting from Apex Events V3 Concierge! How can we assist with your upcoming luxury event?`;
  
  if (type === 'quote') {
    message = `Hi ${customerName}, here is your luxury event quotation for ${bookingCode}. Total estimated budget: $${amount.toLocaleString()}. Let us know if you would like to proceed with advance payment!`;
  } else if (type === 'reminder') {
    message = `Reminder: Hi ${customerName}, your upcoming event under booking code ${bookingCode} is approaching soon. Our lead decorator Marcus Vance will be on site. Reply to confirm!`;
  }

  const whatsappUrl = `https://wa.me/${cleanPhone || '15550192834'}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      <Button
        variant="secondary"
        size={size}
        className="bg-emerald-950/80 hover:bg-emerald-900 border-emerald-700/60 text-emerald-300 gap-1.5"
        icon={type === 'reminder' ? <Bell className="w-3.5 h-3.5 text-emerald-400" /> : type === 'quote' ? <Send className="w-3.5 h-3.5 text-emerald-400" /> : <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />}
      >
        {type === 'quote' ? 'Share Quotation' : type === 'reminder' ? 'Send Reminder' : 'WhatsApp'}
      </Button>
    </a>
  );
};
