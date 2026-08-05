import React, { useState } from 'react';
import { Phone, Mail, Clock, FileText } from 'lucide-react';
import { useV3Store } from '../../../store/v3Store';
import { GlassCard } from '../../../components/v3/ui/GlassCard';
import { Button } from '../../../components/v3/ui/Button';
import { WhatsAppActionBtn } from '../../../components/v3/ui/WhatsAppActionBtn';


export const CrmManager: React.FC = () => {
  const { customers, addCustomerNote } = useV3Store();
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0]?.id || '');
  const [newNoteText, setNewNoteText] = useState<string>('');


  const activeCustomer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !activeCustomer) return;
    addCustomerNote(activeCustomer.id, newNoteText);
    setNewNoteText('');
  };

  return (
    <div className="space-y-6 animate-fade-in font-inter">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-slate-100">Enterprise CRM &amp; VIP Account Manager</h2>
        <p className="text-xs text-slate-400">Complete contact history, WhatsApp status, follow-up logs &amp; spending analytics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Roster List */}
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">Accounts ({customers.length})</div>
          {customers.map((cust) => (
            <div
              key={cust.id}
              onClick={() => setSelectedCustomerId(cust.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                activeCustomer?.id === cust.id
                  ? 'border-amber-500 bg-slate-900 shadow-glow-gold'
                  : 'border-slate-800 bg-slate-950/60 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-100 text-sm">{cust.name}</div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  cust.status === 'VIP' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
                }`}>
                  {cust.status}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1">{cust.email}</div>
              <div className="flex items-center justify-between mt-3 text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-400">Total Spent: <strong className="text-slate-200">${cust.totalSpent.toLocaleString()}</strong></span>
                <span className="text-emerald-400 text-[10px] font-bold">WhatsApp: {cust.whatsappStatus}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Customer Detailed Profile */}
        {activeCustomer && (
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Summary Card */}
            <GlassCard goldBorder hoverEffect={false} className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-heading font-bold text-slate-100">{activeCustomer.name}</h3>
                    <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-xs font-bold">
                      {activeCustomer.status} Customer
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1">
                    <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-500" /> {activeCustomer.email}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-500" /> {activeCustomer.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <WhatsAppActionBtn phone={activeCustomer.phone} customerName={activeCustomer.name} type="chat" size="md" />
                </div>
              </div>

              {/* CRM Key Metrics */}
              <div className="grid grid-cols-3 gap-3 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Total Bookings</span>
                  <span className="text-slate-100 font-bold text-base">{activeCustomer.totalBookings}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Lifetime Revenue</span>
                  <span className="text-amber-400 font-bold text-base">${activeCustomer.totalSpent.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Payment Health</span>
                  <span className="text-emerald-400 font-bold uppercase">{activeCustomer.paymentStatus}</span>
                </div>
              </div>
            </GlassCard>

            {/* Follow-up Notes & Contact History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact History */}
              <GlassCard hoverEffect={false} className="space-y-3">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" /> Touchpoint Timeline
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {activeCustomer.contactHistory.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold text-amber-400 uppercase">{item.type}</span>
                        <span>{item.date}</span>
                      </div>
                      <p className="text-slate-200">{item.summary}</p>
                      <div className="text-[10px] text-slate-500">By: {item.byEmployee}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Follow-up Notes */}
              <GlassCard hoverEffect={false} className="space-y-3">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" /> Internal Notes
                </h4>
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add follow-up note (e.g. prefers gold chandelier decor)..."
                    className="w-full glass-input p-2.5 rounded-lg text-xs h-20 resize-none"
                  />
                  <Button type="submit" variant="primary" size="sm" className="w-full">
                    Save Internal Note
                  </Button>
                </form>

                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {activeCustomer.followUpNotes.map((note) => (
                    <div key={note.id} className="p-2.5 bg-slate-950/60 rounded border border-slate-800 text-xs">
                      <p className="text-slate-300 italic">"{note.note}"</p>
                      <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                        <span>Author: {note.author}</span>
                        <span>{note.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
